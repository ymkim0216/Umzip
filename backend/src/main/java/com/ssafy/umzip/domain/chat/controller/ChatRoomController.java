package com.ssafy.umzip.domain.chat.controller;

import com.ssafy.umzip.domain.chat.dto.ChatMessageResponseDto;
import com.ssafy.umzip.domain.chat.dto.ChatRoomListResponseDto;
import com.ssafy.umzip.domain.chat.entity.ChatRoom;
import com.ssafy.umzip.domain.chat.service.ChatRoomService;
import com.ssafy.umzip.domain.chat.service.ChatService;
import com.ssafy.umzip.global.common.BaseResponse;
import com.ssafy.umzip.global.util.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatRoomController {
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    @PostMapping("/deliver/{receiverId}")
    public ResponseEntity<Object> createDeliverChat(HttpServletRequest request, @PathVariable Long receiverId) {
        Long senderId = jwtTokenProvider.getId(request);
        String senderRole = jwtTokenProvider.getRole(request);
        ChatRoom chatRoom = chatRoomService.createChatRoom(senderId, senderRole, receiverId, "DELIVER");
        Long chatRoomId = chatRoom.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(chatRoomId));
    }

    @PostMapping("/clean/{receiverId}")
    public ResponseEntity<Object> createClenChat(HttpServletRequest request, @PathVariable Long receiverId) {
        Long senderId = jwtTokenProvider.getId(request);
        String senderRole = jwtTokenProvider.getRole(request);
        ChatRoom chatRoom = chatRoomService.createChatRoom(senderId, senderRole, receiverId, "CLEAN");
        Long chatRoomId = chatRoom.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(chatRoomId));
    }


    @PostMapping("/users/{receiverId}")
    public ResponseEntity<Object> createUserChat(HttpServletRequest request, @PathVariable Long receiverId) {
        Long senderId = jwtTokenProvider.getId(request);
        String senderRole = jwtTokenProvider.getRole(request);
        ChatRoom chatRoom = chatRoomService.createChatRoom(senderId, senderRole, receiverId, "USER");
        Long chatRoomId = chatRoom.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(chatRoomId));
    }

    @GetMapping("/rooms")
    public ResponseEntity<Object> retrieveChatRoom(HttpServletRequest request) {
        Long memberId = jwtTokenProvider.getId(request);
        String role = jwtTokenProvider.getRole(request);
        List<ChatRoomListResponseDto> response = chatRoomService.retrieveChatRoom(memberId, role);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(response));
    }

    @GetMapping("/rooms/{chatRoomId}")
    public ResponseEntity<Object> retrieveChatRoomMessage(@PathVariable Long chatRoomId, HttpServletRequest request) {
        Long requestId = jwtTokenProvider.getId(request);
        List<ChatMessageResponseDto> response = chatService.retrieveChatRoomMessages(chatRoomId, requestId);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(response));
    }



}
