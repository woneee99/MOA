package com.ssafy.moa.api.entity.elastic;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "media-info")
@Mapping(mappingPath = "elastic/media-mapping.json")
@Setting(settingPath = "elastic/media-setting.json")
public class MediaInfo {
    @Id
    private Long id;

//    private String name;
//
//    private String nickname;
//
//    private int age;
//
//    private Status status;
//
//    private Zone zone;
//
//    private String description;
//
//    @Field(type = FieldType.Date, format = {date_hour_minute_second_millis, epoch_millis})
//    private LocalDateTime createdAt;
//
//    public static MemberDocument from(Member member){
//        return MemberDocument.builder()
//                .id(member.getId())
//                .name(member.getName())
//                .nickname(member.getNickname())
//                .age(member.getAge())
//                .status(member.getStatus())
//                .zone(member.getZone())
//                .description(member.getDescription())
//                .createdAt(member.getCreatedAt())
//                .build();
//    }
}
