package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import com.ssafy.moa.api.repository.elastic.MediaInfoRepository;
import com.ssafy.moa.api.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaServiceImpl implements MediaService {

    private final MediaInfoRepository mediaInfoRepository;

    @Override
    public List<MediaInfoDocument> searchMedia(String mediaName) {
        return mediaInfoRepository.findByTitleNmOrRelatePlaceDc(mediaName, mediaName);
    }
}
