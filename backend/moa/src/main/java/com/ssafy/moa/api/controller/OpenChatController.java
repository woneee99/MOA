package com.ssafy.moa.api.controller;


import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.service.OpenChatService;
import com.ssafy.moa.common.utils.ApiUtils.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/open-chat")
@RequiredArgsConstructor
public class OpenChatController {
    private final OpenChatService openChatService;

    @PostMapping
    public ApiResult<Long> saveOpenChat(MultipartFile multipartFile, @RequestPart(value = "saveOpenChatRequest") SaveOpenChatRequest saveOpenChatRequest) throws IOException {
        return success(openChatService.saveOpenChat(multipartFile, saveOpenChatRequest));
    }
}
