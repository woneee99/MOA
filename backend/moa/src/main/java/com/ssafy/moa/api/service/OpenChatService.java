package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.entity.OpenChat;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface OpenChatService {
    Long saveOpenChat(MultipartFile multipartFile, SaveOpenChatRequest saveOpenChatRequest) throws IOException;
    Long saveOpenChatMember(Long openChatId, SaveOpenChatMemberRequest saveOpenChatMemberRequest);
    OpenChat findOpenChat(Long openChatId);
}
