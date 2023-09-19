package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.OpenChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OpenChatRepository extends JpaRepository<OpenChat, Long> {
    Optional<OpenChat> findByOpenChatId(Long openChatId);
}
