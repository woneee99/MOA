package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.scrap.ArticleReqDto;
import com.ssafy.moa.api.entity.Article;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.ArticleRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.ArticleService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService {

    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;

    @Override
    public Long createArticleScrap(Long memberId, ArticleReqDto articleReqDto) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new NotFoundException("Not Found Member"));

        Article article = Article.builder()
                .articleTitle(articleReqDto.getArticleTitle())
                .articleContent(articleReqDto.getArticleContent())
                .articleLink(articleReqDto.getArticleLink())
                .member(member)
                .build();

        return articleRepository.save(article).getArticleId();
    }
}
