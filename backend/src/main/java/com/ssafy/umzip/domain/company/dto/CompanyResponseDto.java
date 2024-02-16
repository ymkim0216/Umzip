package com.ssafy.umzip.domain.company.dto;

import com.ssafy.umzip.domain.company.entity.Company;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class CompanyResponseDto {
    private String name;

    private String averageScore;

    private String introduction;

    private List<MostTagResponseDto> mostTag;

    private List<CompanyReviewListResponse> reviewList;

    private String imageUrl;

    private LocalDateTime experience;

    @Builder
    public CompanyResponseDto(String name, String averageScore, String introduction,
                              List<MostTagResponseDto> mostTag,
                              List<CompanyReviewListResponse> reviewList, String imageUrl, LocalDateTime experience) {
        this.name = name;
        this.averageScore = averageScore;
        this.introduction = introduction;
        this.mostTag = mostTag;
        this.reviewList = reviewList;
        this.imageUrl = imageUrl;
        this.experience = experience;
    }

    public static CompanyResponseDto fromEntity(Company company, String formattedAverageScore,
                                                List<MostTagResponseDto> tagList, List<CompanyReviewListResponse> companyReviewList) {
        return CompanyResponseDto.builder()
                .name(company.getName())
                .averageScore(formattedAverageScore)
                .introduction(company.getIntroduction())
                .mostTag(tagList)
                .reviewList(companyReviewList)
                .imageUrl(company.getImageUrl())
                .experience(company.getExperience())
                .build();
    }
}
