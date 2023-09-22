package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.scrap.ArticleReqDto;
import com.ssafy.moa.api.service.ArticleService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        log.info(articleReqDto.toString());
        return success(articleService.createArticleScrap(memberId, articleReqDto));
    }}
