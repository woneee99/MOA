package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.scrap.WordReqDto;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.Word;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.repository.WordRepository;
import com.ssafy.moa.api.service.WordService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WordServiceImpl implements WordService {

    private final MemberRepository memberRepository;
    private final WordRepository wordRepository;

    @Override
    public Long createWordScrap(Long memberId, WordReqDto wordReqDto) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new NotFoundException("Not Found Member"));

        Word word = Word.builder()
                .wordName(wordReqDto.getWordName())
                .wordMean(wordReqDto.getWordMean())
                .member(member)
                .build();

        return wordRepository.save(word).getWordId();
    }
}
