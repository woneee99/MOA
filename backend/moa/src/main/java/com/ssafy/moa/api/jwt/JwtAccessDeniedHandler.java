package com.ssafy.moa.api.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {

        // 403 발생 시 에러 처리
        // 클라이언트가 서버로부터 요청한 리소스에 대한 액세스 권한이 없을 때 발생
        response.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException.getMessage());
    }
}
