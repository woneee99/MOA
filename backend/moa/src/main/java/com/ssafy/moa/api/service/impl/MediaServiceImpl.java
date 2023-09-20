package com.ssafy.moa.api.service.impl;

import co.elastic.clients.elasticsearch._types.aggregations.TermsAggregation;
import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import com.ssafy.moa.api.repository.elastic.MediaInfoRepository;
import com.ssafy.moa.api.service.MediaService;
import com.ssafy.moa.config.ElasticSearchConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.histogram.Histogram;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaServiceImpl implements MediaService {

    private final RestHighLevelClient restHighLevelClient;
    private final MediaInfoRepository mediaInfoRepository;


    @Override
    public List<MediaInfoDocument> searchMedia(String mediaName) {
        return mediaInfoRepository.findByTitleNmOrRelatePlaceDc(mediaName, mediaName);
    }

//    @Override
//    public List<MediaInfoDocument> getMediaType() {
//        return null;
//    }

    @Override
    public List<String> getMediaType() throws IOException {
//        SearchRequest searchRequest = new SearchRequest("media-info-example");
//        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
//
//        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
//        searchSourceBuilder.size(0);
//
//        searchSourceBuilder.aggregation(
//                AggregationBuilders.terms("titleNmKind")
//                        .field("titleNmKind.keyword")
//                        .size(1000)
//        );
//
//        searchRequest.source(searchSourceBuilder);
//
//        SearchResponse searchResponse = elasticsearchClient.search(searchRequest, RequestOptions.DEFAULT);
//        return searchResponse.getAggregations().get("titleNmKind");

        SearchRequest searchRequest = new SearchRequest("media-info-example");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        TermsAggregationBuilder aggregation = new TermsAggregationBuilder("mediaTy_terms")
                .field("titleNmKind")
                .size(5000);

        searchSourceBuilder.aggregation(aggregation);
        searchRequest.source(searchSourceBuilder);

        SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

        Aggregations aggregations = searchResponse.getAggregations();
        ParsedStringTerms aggregationResult = aggregations.get("mediaTy_terms");
        log.info(String.valueOf(aggregationResult.getBuckets().size()));

        List<String> mediaTitleList = new ArrayList<>();
        for (Terms.Bucket bucket: aggregationResult.getBuckets()){
            mediaTitleList.add(bucket.getKeyAsString());
//            log.info("{}, {}", bucket.getKeyAsString(), bucket.getDocCount());
        }

        return mediaTitleList;
    }
}
