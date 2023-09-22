package com.ssafy.moa.api.dto.scrap;

import com.ssafy.moa.api.entity.Article;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArticleDto {
    private Long articleId;
    private String articleTitle;
    private String articleContent;
    private String articleLink;

    @Builder
    public ArticleDto(Long articleId, String articleTitle, String articleContent, String articleLink) {
        this.articleId = articleId;
        this.articleTitle = articleTitle;
        this.articleContent = articleContent;
        this.articleLink = articleLink;
    }

    @Override
    public String toString() {
        return "ArticleDto{" +
                "articleId=" + articleId +
                ", articleTitle='" + articleTitle + '\'' +
                ", articleContent='" + articleContent + '\'' +
                ", articleLink='" + articleLink + '\'' +
                '}';
    }
}
