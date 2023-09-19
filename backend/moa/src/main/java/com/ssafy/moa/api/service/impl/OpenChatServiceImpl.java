package com.ssafy.moa.api.service.impl;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.OpenChat;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.repository.OpenChatRepository;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.api.service.OpenChatService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OpenChatServiceImpl implements OpenChatService {
    private final OpenChatRepository openChatRepository;
    private final MemberService memberService;
    private final String bucketName = "diary_storage";
    private final Storage storage;
    private final String url = "https://storage.googleapis.com/";
    @Override
    public Long saveOpenChat(MultipartFile multipartFile, SaveOpenChatRequest saveOpenChatRequest) throws IOException {
        Member member = memberService.findMember(saveOpenChatRequest.getMemberId());

        String uuid = UUID.randomUUID().toString();
        String ext = multipartFile.getContentType();

        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, "open_chat/" + uuid)
                .setContentType(ext)
                .build();
        storage.create(blobInfo, multipartFile.getInputStream());

        OpenChat openChat = OpenChat.builder()
                .openChatTitle(saveOpenChatRequest.getOpenChatTitle())
                .openChatContent(saveOpenChatRequest.getOpenChatContent())
                .openChatImgUrl(uuid)
                .member(member)
                .build();

        return openChatRepository.save(openChat).getOpenChatId();
    }
}
