package com.ssafy.moa.api.repository.elastic;

import com.ssafy.moa.api.entity.elastic.MediaAutoComplete;
import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface MediaAutoCompleteRepository extends ElasticsearchRepository<MediaAutoComplete, String> {
//    @Query("{\"match\": {\"titleNm.ngram\": {\"query\": \"?0\"}}}")
    List<MediaAutoComplete> findByTitleNmOrRelatePlaceDc(String mediaName1, String mediaName2);
    @Query("{\"match\": {\"titleNm.ngram\": {\"query\": \"?0\"}}}")
    List<MediaAutoComplete> searchByTitleNm(String mediaName);

    @Query("{\"match\": {\"titleNm.ngram\": {\"query\": \"?0\"}}}")
    List<MediaAutoComplete> findByTitleNm(String mediaName);

}
