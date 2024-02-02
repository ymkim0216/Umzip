package com.ssafy.umzip.domain.clean.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class CleanMatchingCompanyDto {
    private Long companyId;
    private Long memberId;
    private LocalDateTime experience;
    private String imageUrl;
    private String ceo;
    private List<String > tags = new ArrayList<>();
    @Builder
    public CleanMatchingCompanyDto(Long companyId, Long memberId, LocalDateTime experience, String imageUrl, String ceo) {
        this.companyId = companyId;
        this.memberId = memberId;
        this.experience = experience;
        this.imageUrl = imageUrl;
        this.ceo = ceo;
    }
}
