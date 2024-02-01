package com.ssafy.umzip.domain.clean.service;

import com.ssafy.umzip.domain.clean.dto.company.CleanQuotationRequestDto;
import com.ssafy.umzip.domain.clean.entity.CleanMapping;
import com.ssafy.umzip.domain.clean.repository.CleanMappingRepository;
import com.ssafy.umzip.domain.code.entity.CodeSmall;
import com.ssafy.umzip.domain.code.repository.CodeSmallRepository;
import com.ssafy.umzip.global.common.StatusCode;
import com.ssafy.umzip.global.exception.BaseException;
import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class CleanCompanyServiceImpl implements CleanCompanyService{
    private final CleanMappingRepository cleanMappingRepository;
    private final CodeSmallRepository codeSmallRepository;
    /*
        업체 : 사용자 거절 API
     */
    @Override
    public Boolean rejectionClean(Long mappingId,Long companyId) {
        CleanMapping cleanMapping = cleanMappingRepository.findById(mappingId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CLEAN_MAPPING));
        if(!cleanMapping.getCompany().getId().equals(companyId)){
            throw new BaseException(StatusCode.INVALID_ACCESS_DELIVERY);
        }

        CodeSmall codeSmall = codeSmallRepository.findById(204L).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CODE));

        try{
            cleanMapping.setCodeSmall(codeSmall);
        }catch (OptimisticLockException e){
            return false;
        }

        return true;
    }
    /*
        업체 : 사용자 견적 제안 API
     */

    @Override
    public Boolean quotationClean(CleanQuotationRequestDto dto, Long companyId) {
        return null;
    }
}
