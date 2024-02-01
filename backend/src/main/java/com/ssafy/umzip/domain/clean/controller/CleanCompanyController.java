package com.ssafy.umzip.domain.clean.controller;

import com.ssafy.umzip.domain.clean.dto.company.CleanQuotationRequestDto;
import com.ssafy.umzip.domain.clean.dto.company.CleanRejectionRequestDto;
import com.ssafy.umzip.domain.clean.service.CleanCompanyService;
import com.ssafy.umzip.global.common.BaseResponse;
import com.ssafy.umzip.global.common.StatusCode;
import com.ssafy.umzip.global.util.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clean/company")
public class CleanCompanyController {
    private final CleanCompanyService cleanCompanyService;
    private final JwtTokenProvider jwtTokenProvider;
    @PutMapping("/rejection")
    public ResponseEntity<Object> rejectionClean(@RequestBody CleanRejectionRequestDto rejectionRequestDto,
                                                 HttpServletRequest request
    ){
        Long companyId = jwtTokenProvider.getId(request);
        Boolean result = cleanCompanyService.rejectionClean(rejectionRequestDto.getMappingId(),companyId);

        return result?ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS)):
                ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.FAIL_TO_REJECTION));
    }
    @PutMapping("/quotation")
    public ResponseEntity<Object> quotationClean(@RequestBody CleanQuotationRequestDto requestDto,
                                                 HttpServletRequest request){
        Long id = jwtTokenProvider.getId(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(StatusCode.SUCCESS));
    }



}
