package com.ssafy.umzip.domain.company.dto;

import com.ssafy.umzip.domain.company.entity.Company;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CompanyResponseDto {
    private String name;

    private String averageScore;

    private String introduction;

    private List<String> mostTag;

    @Builder
    public CompanyResponseDto(String name, String averageScore, String introduction, List<String> mostTag) {
        this.name = name;
        this.averageScore = averageScore;
        this.introduction = introduction;
        this.mostTag = mostTag;
    }

    public static CompanyResponseDto fromEntity(Company company, String formattedAverageScore, List<String> tagList) {
        return CompanyResponseDto.builder()
                .name(company.getName())
                .averageScore(formattedAverageScore)
                .introduction(company.getIntroduction())
                .mostTag(tagList)
                .build();
    }
}
