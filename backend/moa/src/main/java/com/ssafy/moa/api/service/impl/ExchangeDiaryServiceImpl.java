package com.ssafy.moa.api.service.impl;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.ssafy.moa.api.dto.ExchangeDiaryDto.*;
import com.ssafy.moa.api.dto.member.MemberDto;
import com.ssafy.moa.api.entity.ExchangeDiary;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.ExchangeDiaryRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.ExchangeDiaryService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExchangeDiaryServiceImpl implements ExchangeDiaryService {

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;
    private final MemberRepository memberRepository;
    private final ExchangeDiaryRepository exchangeDiaryRepository;
    private final Storage storage;
    private final String url = "https://storage.googleapis.com/";

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveExchangeDiary(MultipartFile multipartFile, ExchangeDiaryRequest exchangeDiaryRequest) throws IOException {
        Member member = memberRepository.findByMemberId(exchangeDiaryRequest.getMemberId())
                .orElseThrow(() -> new NotFoundException("Not Found User"));

        String uuid = UUID.randomUUID().toString();
        String ext = multipartFile.getContentType();

        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, uuid)
                .setContentType(ext)
                .build();
        storage.create(blobInfo, multipartFile.getInputStream());

        LocalDateTime now = LocalDateTime.now();
        ExchangeDiary exchangeDiary = ExchangeDiary.builder()
                .exchangeDiaryTitle(exchangeDiaryRequest.getExchangeDiaryTitle())
                .exchangeDiaryContent(exchangeDiaryRequest.getExchangeDiaryContent())
                .exchangeDiaryPicture(uuid)
                .exchangeDiaryDate(now)
                .member(member)
                .createdAt(now)
                .updatedAt(now)
                .build();
        return exchangeDiaryRepository.save(exchangeDiary).getExchangeDiaryId();
    }

    @Override
    public List<ExchangeDiaryResponse> findExchangeDiary(Long memberId) {
        return null;
    }

    @Override
    public ExchangeDiaryDetailResponse findExchangeDiaryDetail(Long exchangeDiaryId) {
        ExchangeDiary exchangeDiary = exchangeDiaryRepository.findByExchangeDiaryId(exchangeDiaryId);
        String imgUrl = url + bucketName + "/" + exchangeDiary.getExchangeDiaryPicture();

        Member member = exchangeDiary.getMember();
        MemberDto memberDto = MemberDto.builder()
                .memberId(member.getMemberId())
                .memberEmail(member.getMemberEmail())
                .memberName(member.getMemberName())
                .build();

        return ExchangeDiaryDetailResponse.builder()
                .member(memberDto)
                .exchangeDiaryTitle(exchangeDiary.getExchangeDiaryTitle())
                .exchangeDiaryContent(exchangeDiary.getExchangeDiaryContent())
                .exchangeDiaryImgUrl(imgUrl)
                .exchangeDiaryDate(exchangeDiary.getExchangeDiaryDate())
                .build();
    }
}
