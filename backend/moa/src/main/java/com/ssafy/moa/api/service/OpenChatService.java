package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.OpenChatDto.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface OpenChatService {
    Long saveOpenChat(MultipartFile multipartFile, SaveOpenChatRequest saveOpenChatRequest) throws IOException;
}
