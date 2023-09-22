package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.scrap.ArticleDto;
import com.ssafy.moa.api.dto.scrap.ArticleReqDto;
import com.ssafy.moa.api.service.ArticleService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/scrap")
@RequiredArgsConstructor
@Slf4j
public class ScrapController {
    private final ArticleService articleService;

    // Todo : 추후 authentication를 사용해서 실제 memberId로 변경
    @Operation(summary = "뉴스 스크랩북 등록", description = "뉴스를 내 스크랩북에 등록할 수 있습니다.", tags = { "Scrap Controller" })
    @PostMapping("/news")
    public ApiResult<Long> createArticleScrap(/*@RequestHeader("Authorization") String header,*/ @RequestBody ArticleReqDto articleReqDto){
//        String token = header.substring(7);
//        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Long memberId = 5L;
        return success(articleService.createArticleScrap(memberId, articleReqDto));
    }

    // Todo : 추후 authentication를 사용해서 실제 memberId로 변경
    @Operation(summary = "스크랩북 뉴스 전체 조회", description = "내가 스크랩한 모든 뉴스를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/news")
    public ApiResult<List<ArticleDto>> getAllArticleScrap(/*@RequestHeader("Authorization") String header,*/){
//        String token = header.substring(7);
//        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Long memberId = 5L;
        return success(articleService.getAllArticleScrap(memberId));
    }

    @Operation(summary = "스크랩북 뉴스 상세 조회", description = "내가 선택한 스크랩 뉴스의 상세정보를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/news/{articleId}")
    public ApiResult<ArticleDto> getArticle(@PathVariable("articleId") Long articleId){
        return success(articleService.getArticle(articleId));
    }
}
