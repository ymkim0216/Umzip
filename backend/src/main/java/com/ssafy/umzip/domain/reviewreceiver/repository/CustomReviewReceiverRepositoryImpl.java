package com.ssafy.umzip.domain.reviewreceiver.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.umzip.domain.company.dto.CompanyReviewListResponse;
import com.ssafy.umzip.domain.company.dto.MostTagResponseDto;
import com.ssafy.umzip.domain.company.entity.QCompany;
import com.ssafy.umzip.domain.member.entity.QMember;
import com.ssafy.umzip.domain.review.entity.QReview;
import com.ssafy.umzip.domain.reviewreceiver.dto.ScoreInfoDto;
import com.ssafy.umzip.domain.reviewreceiver.dto.TopTagListRequest;
import com.ssafy.umzip.domain.reviewreceiver.dto.TopTagListResponse;
import com.ssafy.umzip.domain.reviewreceiver.entity.QReviewReceiver;
import com.ssafy.umzip.domain.reviewtag.entity.QReviewTag;
import com.ssafy.umzip.domain.tag.entity.QTag;
import com.ssafy.umzip.global.common.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ssafy.umzip.domain.review.entity.QReview.review;
import static com.ssafy.umzip.domain.reviewreceiver.entity.QReviewReceiver.reviewReceiver;

@RequiredArgsConstructor
@Slf4j
public class CustomReviewReceiverRepositoryImpl implements CustomReviewReceiverRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<MostTagResponseDto> findTopTagsByMemberId(Long memberId, int limit, Role role) {
        QReviewReceiver reviewReceiver = QReviewReceiver.reviewReceiver;
        QReviewTag reviewTag = QReviewTag.reviewTag;
        QTag tag = QTag.tag;

        return queryFactory
                .select(Projections.constructor(
                        MostTagResponseDto.class,
                        tag.tagName.as("tagName"),
                        tag.tagType.as("tagType")
                ))
                .from(reviewReceiver)
                .join(reviewTag).on(reviewReceiver.review.eq(reviewTag.review))
                .where(reviewReceiver.receiverRole.eq(role))
                .join(reviewTag.tag, tag)
                .where(reviewReceiver.member.id.eq(memberId))
                .groupBy(tag.tagId, tag.tagName)
                .orderBy(tag.tagId.count().desc())
                .limit(limit)
                .fetch();
    }

    public List<TopTagListResponse> findTopTagsListByMemberIdAndRole(TopTagListRequest companyList) {
        QReviewReceiver reviewReceiver = QReviewReceiver.reviewReceiver;
        QReviewTag reviewTag = QReviewTag.reviewTag;
        QTag tag = QTag.tag;
        QCompany company = QCompany.company;

        List<TopTagListResponse> topTags = new ArrayList<>();
        for (int i = 0; i < companyList.getMemberId().size(); i++) {
            /*
            * SELECT t.tag_id, t.tag_name, COUNT(t.tag_id) AS count
                FROM review_receiver rr
                JOIN review_tag rt ON rt.review_id = rr.review_id
                JOIN tag t ON rt.tag_id = t.tag_id
                WHERE rr.member_id = 1
                AND rr.receiver_role = 'CLEAN'
                GROUP BY t.tag_id, t.tag_name
                ORDER BY COUNT(t.tag_id) DESC
                LIMIT 3;
            * */
            List<String> tags = queryFactory
                    .select(tag.tagName)
                    .from(reviewReceiver)
                    .join(reviewTag).on(reviewReceiver.review.id.eq(reviewTag.review.id))
                    .join(tag).on(reviewTag.tag.tagId.eq(tag.tagId))
                    .where(reviewReceiver.receiverRole.eq(Role.valueOf(companyList.getRole()))
                            .and(reviewReceiver.member.id.eq(companyList.getMemberId().get(i))))
                    .groupBy(tag.tagId)
                    .orderBy(tag.tagId.count().desc())
                    .limit(companyList.getLimit())
                    .fetch();

            Long companyId = queryFactory.select(company.id)
                    .from(company)
                    .where(company.role.eq(Role.valueOf(companyList.getRole()))
                            .and(company.member.id.eq(companyList.getMemberId().get(i))))
                    .fetchFirst();

            if (companyId != null) {
                topTags.add(new TopTagListResponse(tags, companyId));
            }
        }

        return topTags;
    }

    @Override
    public List<CompanyReviewListResponse> findReviewByMemberIdAndRole(Long memberId, int limit, Role role) {
        QReview review = QReview.review;
        QReviewReceiver reviewReceiver = QReviewReceiver.reviewReceiver;
        QReviewTag reviewTag = QReviewTag.reviewTag;
        QTag tag = QTag.tag;
        QMember member = QMember.member;

        List<CompanyReviewListResponse> responses = queryFactory
                .select(Projections.constructor(
                        CompanyReviewListResponse.class,
                        review.id.as("reviewId"),
                        review.member.name.as("writerName"),
                        review.member.imageUrl.as("writerProfileImage"),
                        review.content.as("reviewContent"),
                        review.createDt.as("createDt"),
                        review.score.as("score")
                ))
                .from(reviewReceiver)
                .join(reviewReceiver.review, review)
                .join(review.member, member)
                .where(reviewReceiver.receiverRole.eq(role),
                        reviewReceiver.member.id.eq(memberId))
                .fetch();

        List<Tuple> list = queryFactory
                .select(reviewTag.review.id, reviewTag.tag.tagName, reviewTag.tag.tagType)
                .from(reviewTag)
                .join(reviewTag.review, review)
                .join(reviewTag.tag, tag)
                .fetch();


        Map<Long, List<MostTagResponseDto>> reviewIdToTagNames = list.stream()
                .collect(Collectors.groupingBy(
                        tuple -> tuple.get(reviewTag.review.id),
                        Collectors.mapping(
                                tuple -> new MostTagResponseDto(
                                        tuple.get(reviewTag.tag.tagName), // tagName 추출
                                        tuple.get(reviewTag.tag.tagType)  // tagType 추출
                                ),
                                Collectors.toList() // MostTagResponseDto 객체의 리스트로 수집
                        )
                ));

        responses.forEach(response -> {
            List<MostTagResponseDto> tagNameList = reviewIdToTagNames.get(response.getReviewId());
            response.setTagList(tagNameList);
        });

        return responses;
    }

    @Override
    public List<ScoreInfoDto> findScoreByCompanyMemberId(List<Long> companyList, Role role) {
        List<ScoreInfoDto> result = queryFactory.select(
                        Projections.constructor(
                                ScoreInfoDto.class,
                                reviewReceiver.member.id.as("memberId"),
                                review.score.avg().as("score")
                        )
                ).from(reviewReceiver)
                .join(review).on(review.id.eq(reviewReceiver.review.id))
                .where(reviewReceiver.member.id.in(companyList),
                        reviewReceiver.receiverRole.eq(role))
                .groupBy(reviewReceiver.member.id)
                .fetch();

        return result;
    }
}
