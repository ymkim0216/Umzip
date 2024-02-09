package com.ssafy.umzip.domain.chat.service;

import com.ssafy.umzip.domain.chat.dto.ChatDetailResponseDto;
import com.ssafy.umzip.domain.chat.dto.ChatMessageRequestDto;
import com.ssafy.umzip.domain.chat.dto.ChatMessageResponseDto;
import com.ssafy.umzip.domain.chat.dto.ChatTradeMessageRequestDto;
import com.ssafy.umzip.domain.chat.entity.*;
import com.ssafy.umzip.domain.chat.repository.ChatMessageRepository;
import com.ssafy.umzip.domain.chat.repository.ChatParticipantRepository;
import com.ssafy.umzip.domain.chat.repository.ChatRoomRepository;
import com.ssafy.umzip.domain.company.repository.CompanyRepository;
import com.ssafy.umzip.domain.member.entity.Member;
import com.ssafy.umzip.domain.member.repository.MemberRepository;
import com.ssafy.umzip.domain.trade.entity.BoardTradeImage;
import com.ssafy.umzip.domain.trade.repository.BoardTradeImageRepository;
import com.ssafy.umzip.global.common.StatusCode;
import com.ssafy.umzip.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final BoardTradeImageRepository boardTradeImageRepository;
    private final CompanyRepository companyRepository;


    @Transactional
    @Override
    public ChatMessageResponseDto saveMessage(ChatMessageRequestDto message, Long chatRoomId, Long requestId, String role) {
        Long id = requestId;
        if (role.equals("DELIVER") || role.equals("CLEAN")) {
            id = companyRepository.findById(id)
                    .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_COMMENT_PK))
                    .getMember().getId();
        }

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));

        ChatMessage chatMessage = ChatMessageRequestDto.toEntity(message, member, chatRoomId);

        ChatMessage savedMessage = chatMessageRepository.save(chatMessage);

        List<ChatParticipant> chatParticipantList = chatParticipantRepository.findByChatRoomId(chatRoomId);

        for (ChatParticipant cp : chatParticipantList) {
            if (cp.getMember().getId().equals(id)) {
                cp.updateLastReadMessage(savedMessage.getId());
            }
            if (!cp.getStatus().equals(ChatRoomStatus.TALK)) {
                cp.talkWithChatRoom();
            }
        }

        return ChatMessageRequestDto.toResponseDto(message.getContent(), member, LocalDateTime.now());
    }

    @Transactional
    @Override
    public ChatDetailResponseDto retrieveChatRoomMessages(Long chatRoomId, Long requestId, String role) {
        Long id = requestId;
        if (role.equals("DELIVER") || role.equals("CLEAN")) {
            id = companyRepository.findById(id)
                    .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_COMMENT_PK))
                    .getMember().getId();
        }

        Member requester = memberRepository.findById(id)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));

        Member anotherMember = chatParticipantRepository.findByChatRoomAndMemberId(chatRoomId, id);

        List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomId(chatRoomId);

        List<ChatMessageResponseDto> responseDto = chatMessages.stream()
                .map(message -> {
                    Member userInfo = message.getSenderId().equals(requestId.toString()) ? requester : anotherMember;

                    return new ChatMessageResponseDto(
                            message.getContent(),
                            requestId,
                            userInfo.getName(),
                            message.getSenderId(),
                            userInfo.getImageUrl(),
                            message.getUpdateDt()
                    );
                })
                .sorted(Comparator.comparing(ChatMessageResponseDto::getSendTime))
                .toList();

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new BaseException(StatusCode.CANNOT_FIND_CHATROOM_WITH_PK));

        ChatTradeMessageRequestDto chatTradeMessageRequestDto;
        ChatDetailResponseDto response;

        if (chatRoom.getRoomType().equals(ChatRoomType.TRADE)) {
            BoardTradeImage boardTrade = boardTradeImageRepository.findAllById(chatRoom.getTradeId()).get(0);
            chatTradeMessageRequestDto =ChatTradeMessageRequestDto.builder()
                    .tradeItemTitle(boardTrade.getBoardTrade().getTitle())
                    .tradeId(boardTrade.getBoardTrade().getId())
                    .tradeItemPrice(boardTrade.getBoardTrade().getPrice())
                    .tradeItemImage(boardTrade.getPath())
                    .build();

            response = ChatDetailResponseDto.builder()
                    .chatMessages(responseDto)
                    .build();
            response.setTradeItem(chatTradeMessageRequestDto);

            return response;

        }

        return ChatDetailResponseDto.builder()
                .chatMessages(responseDto)
                .build();
    }
}