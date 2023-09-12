package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberEmail(String memberEmail);
}
