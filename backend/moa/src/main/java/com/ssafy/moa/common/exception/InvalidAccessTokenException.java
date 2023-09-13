package com.ssafy.moa.common.exception;

public class InvalidAccessTokenException extends RuntimeException{
    public InvalidAccessTokenException(String message) {
        super(message);
    }

    public InvalidAccessTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
