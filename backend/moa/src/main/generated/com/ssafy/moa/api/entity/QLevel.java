package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLevel is a Querydsl query type for Level
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLevel extends EntityPathBase<Level> {

    private static final long serialVersionUID = 371292067L;

    public static final QLevel level = new QLevel("level");

    public final NumberPath<Integer> levelGrade = createNumber("levelGrade", Integer.class);

    public final NumberPath<Long> levelId = createNumber("levelId", Long.class);

    public final StringPath levelName = createString("levelName");

    public final NumberPath<Integer> requiredExp = createNumber("requiredExp", Integer.class);

    public QLevel(String variable) {
        super(Level.class, forVariable(variable));
    }

    public QLevel(Path<? extends Level> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLevel(PathMetadata metadata) {
        super(Level.class, metadata);
    }

}

