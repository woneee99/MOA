package com.ssafy.moa.api.service;

import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;

import java.util.List;

public interface MediaService {
    List<MediaInfoDocument> searchMedia(String mediaName);
}
