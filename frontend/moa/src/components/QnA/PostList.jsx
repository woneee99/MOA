import React, {useState} from "react";
// import { useEffect } from "react"; 나중에 서버 통신 할 때 

function PostList(){
  const [post, setPosts] = useState([]);

  // useEffect(() => {
    //fetch("") 

  return(
    <>
      <h3>질문/교정 게시글 리스트</h3>
      {/* <ul>
        {articles.map((article)=>(
          <li key={article.id}>
            <a href={`/article/${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default PostList;