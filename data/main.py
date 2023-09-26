from fastapi import FastAPI, Query, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import logging
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

app = FastAPI()

# MongoDB에 연결
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["moa"]

# 컬렉션 가져오기
articles_collection = db["articles"]
sentences_collection = db["sentences"]
words_collection = db["words"]

# 오류 처리를 위한 커스텀 예외 클래스 생성
class ItemNotFoundError(HTTPException):
    def __init__(self, item_id: int):
        detail = f"Item with id {item_id} not found"
        super().__init__(status_code=404, detail=detail)

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,  # 로그 레벨 설정 (INFO, WARNING, ERROR 등)
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

# 단어의 상위 N개 가져오기
@app.get("/words/top")
def get_top_words(top_n: int = Query(30, description="빈도 상위 30개 단어 수")):
    try:
        top_words = list(
            words_collection.aggregate([
                {"$group": {"_id": "$word", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": top_n}
            ])
        )
        return top_words
    except Exception as e:
        logger.error(str(e))
        raise

# 특정 단어를 포함하는 기사 목록 가져오기
@app.get("/articles/with_word")
def get_articles_with_word(word: str):
    try:
        # 같은 단어들에서 sentence_id 추출
        word_cursor = words_collection.find({"word": word})
        article_ids = [word["article_id"] for word in word_cursor]

        # article_ids를 사용하여 해당 기사 정보 검색
        articles = []
        for article_id in article_ids:
            # 'ObjectId' 필드를 제외하고 다른 필드만 선택적으로 가져옴
            article_info = articles_collection.find_one(
                {"article_id": article_id},
                projection={"_id": False}  # '_id' 필드를 제외하고 가져옴
            )
            articles.append(article_info)

        return articles
    except Exception as e:
        logger.error(str(e))
        raise


# 특정 단어를 포함하는 문장 목록 가져오기
@app.get("/sentences/with_word")
def get_sentences_with_word(word: str):
    try:
        # 같은 단어들에서 sentence_id 추출
        word_cursor = words_collection.find({"word": word})
        sentence_ids = [word["sentence_id"] for word in word_cursor]

        # sentence_ids를 사용하여 해당 문장 정보 검색
        sentences = []
        for sentence_id in sentence_ids:
            # 'ObjectId' 필드를 제외하고 다른 필드만 선택적으로 가져옴
            sentence_info = sentences_collection.find_one(
                {"sentence_id": sentence_id},
                projection={"_id": False}  # '_id' 필드를 제외하고 가져옴
            )
            sentences.append(sentence_info)

        return sentences
    except Exception as e:
        logger.error(str(e))
        raise



# 특정 기사 정보 가져오기
@app.get("/articles/{article_id}")
def get_article(article_id: int):
    try:
        article = articles_collection.find_one(
            {"article_id": article_id},
            projection={"_id": False}
        )
        if not article:
            raise ItemNotFoundError(article_id)  # 오류 발생
        return article
    except ItemNotFoundError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(str(e))
        raise

# 특정 문장 정보 가져오기
@app.get("/sentences/{sentence_id}")
def get_sentence(sentence_id: int):
    try:
        sentence = sentences_collection.find_one(
            {"sentence_id": sentence_id},
            projection={"_id": False}
        )
        if not sentence:
            raise ItemNotFoundError(sentence_id)  # 오류 발생
        return sentence
    except ItemNotFoundError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(str(e))
        raise

# 특정 단어 정보 가져오기
@app.get("/words/{word_id}")
def get_word(word_id: int):
    try:
        word = words_collection.find_one(
            {"word_id": word_id},
            projection={"_id": False}
        )
        if not word:
            raise ItemNotFoundError(word_id)  # 오류 발생
        return word
    except ItemNotFoundError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(str(e))
        raise

# TF-IDF 벡터화
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform([article["title"] for article in articles_collection.find()])

# 코사인 유사도 계산
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# 연관 기사를 찾는 함수
def get_related_articles(article_id: str, top_n: int = 5):
    article_index = article_id
    related_articles_indices = cosine_sim[article_index].argsort()[::-1][1:top_n + 1]
    related_articles = []
    for index in related_articles_indices:
        article_info = articles_collection.find_one({"title": articles_collection.find()[index]["title"]})
        related_articles.append(article_info)
    return related_articles

# 특정 기사와 연관된 기사 목록 가져오기 (상위 5개)
@app.get("/articles/{article_id}/related")
def get_related_articles_endpoint(article_id: int, top_n: int = Query(5, description="상위 연관 기사 수")):
    try:
        article = articles_collection.find_one({"article_id": article_id})
        if not article:
            return {"message": "기사를 찾을 수 없습니다."}

        related_articles = get_related_articles(article["article_id"], top_n)
        return related_articles
    except Exception as e:
        return {"error": str(e)}
        
# FastAPI 모델
class SearchQuery(BaseModel):
    query: str

# 텍스트 검색을 위한 엔드포인트
@app.post("/search")
def text_search(query: SearchQuery):
    try:
        # 텍스트 검색 로직
        return {"query": query.query, "results": []}
    except Exception as e:
        logger.error(str(e))
        raise
