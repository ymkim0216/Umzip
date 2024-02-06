package com.ssafy.umzip.domain.alarm.entity;

import com.ssafy.umzip.domain.member.entity.Member;
import com.ssafy.umzip.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private long id;

    @Column(name = "alarm_content")
    private String content;

    @Column(name = "alarm_read")
    private Boolean isRead;
    @Column(name="alarm_img_path")
    private String imgPath;
    @ManyToOne(cascade= CascadeType.REMOVE)
    @JoinColumn(name="member_id")
    private Member member;
    @Builder
    public Alarm(String content, Boolean isRead, Member member,String imgPath) {
        this.content = content;
        this.isRead = isRead;
        this.member = member;
        this.imgPath = imgPath;
    }
}