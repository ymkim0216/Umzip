package com.ssafy.umzip.domain.chat.controller;

import com.ssafy.umzip.domain.chat.dto.ChatMessage;
import com.ssafy.umzip.domain.chat.dto.ChatMessageRequestDto;
import com.ssafy.umzip.domain.chat.entity.ChatRoom;
import com.ssafy.umzip.domain.chat.service.ChatService;
import com.ssafy.umzip.global.common.BaseResponse;
import com.ssafy.umzip.global.util.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class ChatController {
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatService chatService;
    private final SimpMessagingTemplate template;

    @MessageMapping("/hello")
    public void sendMessage(@Payload ChatMessageRequestDto messageRequestDto) {
      template.convertAndSend("/topic/greetings", messageRequestDto.getContent());
    }

    @PostMapping("/chat/deliver/{receiverId}")
    public ResponseEntity<Object> createDeliverChat(HttpServletRequest request, @PathVariable Long receiverId) {
        Long senderId = jwtTokenProvider.getId(request);
        String senderRole = jwtTokenProvider.getRole(request);
        ChatRoom chatRoom = chatService.createChatRoom(senderId, senderRole, receiverId, "DELIVER");
        String subscriptionPath = "/topic/chatroom/" + chatRoom.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(subscriptionPath));
    }

    @PostMapping("/chat/clean/{receiverId}")
    public ResponseEntity<Object> createClenChat(HttpServletRequest request, @PathVariable Long receiverId) {
        Long senderId = jwtTokenProvider.getId(request);
        String senderRole = jwtTokenProvider.getRole(request);
        ChatRoom chatRoom = chatService.createChatRoom(senderId, senderRole, receiverId, "CLEAN");
        String subscriptionPath = "/topic/chatroom/" + chatRoom.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(subscriptionPath));
    }


    @PostMapping("/chat/user/{receiverId}")
    public ResponseEntity<Object> createUserChat(HttpServletRequest request, @PathVariable Long receiverId) {
        Long senderId = jwtTokenProvider.getId(request);
        String senderRole = jwtTokenProvider.getRole(request);
        ChatRoom chatRoom = chatService.createChatRoom(senderId, senderRole, receiverId, "USER");
        String subscriptionPath = "/topic/chatroom/" + chatRoom.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(subscriptionPath));
    }


    @MessageMapping("/chat/{chatRoomId}")
    public void send(@Payload ChatMessageRequestDto message, @DestinationVariable Long chatRoomId) {
        template.convertAndSend("/topic/chatroom/" + chatRoomId, message.getContent());
    }
}
