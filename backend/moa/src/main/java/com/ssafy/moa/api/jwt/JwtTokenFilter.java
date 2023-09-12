package com.ssafy.moa.api.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String REFRESH_HEADER = "Refresh";

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = resolveToken(request, AUTHORIZATION_HEADER);

        if(jwt != null && jwtTokenProvider.validateToken(jwt) == JwtTokenProvider.JwtCode.ACCESS) {
            Authentication authentication = jwtTokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("set Authentication to security context for '{}', uri: {}", authentication.getName(), request.getRequestURI());
        }
        // accessToken이 만료되었을 때
        else if(jwt != null && jwtTokenProvider.validateToken(jwt) == JwtTokenProvider.JwtCode.EXPIRED) {
            String refresh = resolveToken(request, REFRESH_HEADER);
            // refreshToken을 확인해서 재발급해준다.
            if(refresh != null && jwtTokenProvider.validateToken(refresh) == JwtTokenProvider.JwtCode.ACCESS) {
                String newRefresh = jwtTokenProvider.reissueRefreshToken(refresh);
                if(newRefresh != null) {
                    response.setHeader(REFRESH_HEADER, "Bearer "+newRefresh);

                    // accessToken 생성
                    Authentication authentication = jwtTokenProvider.getAuthentication(refresh);
                    response.setHeader(AUTHORIZATION_HEADER, "Bearer " + jwtTokenProvider.createAccessToken(authentication));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.info("reissue refresh Token & access Token");
                }
            }
        }
        else {
            log.info("no valid JWT token found, uri: {}", request.getRequestURI());
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request, String header) {
        String bearerToken = request.getHeader(header);
        if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
