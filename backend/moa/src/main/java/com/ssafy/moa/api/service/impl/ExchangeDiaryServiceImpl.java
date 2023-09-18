package com.ssafy.moa.api.service.impl;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.ssafy.moa.api.dto.ExchangeDiaryDto;
import com.ssafy.moa.api.entity.ExchangeDiary;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.ExchangeDiaryRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.ExchangeDiaryService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExchangeDiaryServiceImpl implements ExchangeDiaryService {

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;
    private final MemberRepository memberRepository;
    private final ExchangeDiaryRepository exchangeDiaryRepository;
    private final Storage storage;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveExchangeDiary(MultipartFile multipartFile, ExchangeDiaryDto.ExchangeDiaryRequest exchangeDiaryRequest) throws IOException {
        System.out.println("exchangeDiaryRequest.getMemberId() = " + exchangeDiaryRequest.getMemberId());
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
                .exchangeDiaryContent(exchangeDiaryRequest.getExchangeDiaryContent())
                .exchangeDiaryPicture(uuid)
                .exchangeDiaryDate(now)
                .createdAt(now)
                .updatedAt(now)
                .build();
        return exchangeDiaryRepository.save(exchangeDiary).getExchangeDiaryId();
    }
}
