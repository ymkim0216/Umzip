package com.ssafy.umzip.domain.trade.service;

import com.ssafy.umzip.domain.trade.dto.*;
import com.ssafy.umzip.domain.trade.entity.BoardTrade;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardTradeService {

    void PostBoardTrade(PostRequestDto requestDto, List<MultipartFile> files);

    Slice<ListDto> listBoardTrade(ListRequestDto requestDto, Pageable pageable);

    DetailDto detailBoardTrade(DetailRequestDto requestDto);
}
