package com.ssafy.umzip.domain.chat.repository;

import com.ssafy.umzip.domain.chat.entity.ChatParticipant;
import com.ssafy.umzip.domain.chat.entity.ChatRoom;
import com.ssafy.umzip.domain.member.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {
    @Query("select cp.chatRoom FROM ChatParticipant cp where cp.member.id=:memberId AND " +
            "cp.role=:role")
    List<ChatRoom> findAllByMemberIdAndRole(@Param("memberId") Long memberId,@Param("role") String role);

    @Query("select cp FROM ChatParticipant cp where cp.chatRoom.id=:chatRoomId AND " +
            "cp.member.id=:memberId")
    Optional<ChatParticipant> findByChatRoomAndMember(@Param("chatRoomId") Long chatRoomId, @Param("memberId") Long memberId);

    @Query("select cp FROM ChatParticipant cp where cp.chatRoom.id=:chatRoomId AND " +
            "cp.member.id!=:memberId")
    ChatParticipant findByChatRoomAndMemberId(@Param("chatRoomId") Long chatRoomId, @Param("memberId") Long memberId);

    List<ChatParticipant> findByChatRoomId(Long chatRoomId);

    List<ChatParticipant> findByMemberIdAndChatRoomIdIn(Long memberId, List<Long> chatRoomIds);

}
