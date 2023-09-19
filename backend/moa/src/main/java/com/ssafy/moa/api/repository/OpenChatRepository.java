package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.OpenChat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenChatRepository extends JpaRepository<OpenChat, Long> {
}
