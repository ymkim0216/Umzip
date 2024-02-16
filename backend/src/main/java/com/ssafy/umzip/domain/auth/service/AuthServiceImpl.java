package com.ssafy.umzip.domain.auth.service;

import com.ssafy.umzip.domain.auth.dto.AuthCodeRequestDto;
import com.ssafy.umzip.domain.auth.dto.AuthEmailRequestDto;
import com.ssafy.umzip.domain.company.entity.Company;
import com.ssafy.umzip.domain.company.repository.CompanyRepository;
import com.ssafy.umzip.domain.member.repository.MemberRepository;
import com.ssafy.umzip.global.common.Role;
import com.ssafy.umzip.global.common.StatusCode;
import com.ssafy.umzip.global.exception.BaseException;
import com.ssafy.umzip.global.util.jwt.JwtTokenProvider;
import com.ssafy.umzip.global.util.jwt.MemberTokenDto;
import com.ssafy.umzip.global.util.redis.RedisService;
import com.ssafy.umzip.global.util.sms.SmsUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final SmsUtil smsUtil;

    private final RedisService redisService;

    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final JwtTokenProvider jwtTokenProvider;

    //    @Value("${SMS_SERVICE_ID}")
    private String serviceId;

    //@Value("${SMS_ACCESS_KEY}")
    private String accessKey;

    //@Value("${SMS_SECRET_KEY}")
    private String secretKey;

    //@Value("${SMS_SENDER_PHONE}")
    private String senderPhone;

    public String makeSignature(String time) throws Exception {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + serviceId + "/messages";

        String message = method +
                space +
                url +
                newLine +
                time +
                newLine +
                accessKey;

        SecretKeySpec signingKey;
        Mac mac;
        String encodeBase64String;

        try {
            signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);

            byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            encodeBase64String = Base64.encodeBase64String(rawHmac);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }

        return encodeBase64String;
    }

    @Override
    public void sendCode(AuthCodeRequestDto codeRequestDto) {
        String code = createCode();
        smsUtil.sendAuthCode(codeRequestDto.getPhone(), code);

        redisService.createSmsCertification(codeRequestDto.getPhone(), code);
    }

    public String createCode() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();

        for (int i = 0; i < 4; i++) {
            int index = rnd.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    break;
            }
        }
        return key.toString();
    }

    @Override
    public void authCode(AuthCodeRequestDto codeRequestDto) {
        if (isVerify(codeRequestDto)) {
            throw new BaseException(StatusCode.NOT_VALID_AUTH_CODE);
        }

        if (!isVerify(codeRequestDto) && memberRepository.existsByPhone(codeRequestDto.getPhone())) {
            throw new BaseException(StatusCode.ALREADY_EXIST_PHONE_NUMBER);
        }

        redisService.removeSmsCertification(codeRequestDto.getPhone());
    }

    @Override
    public void authEmail(AuthEmailRequestDto emailRequestDto) {
        if (memberRepository.existsByEmail(emailRequestDto.getEmail())) {
            throw new BaseException(StatusCode.ALREADY_EXIST_MEMBER);
        }
    }

    @Override
    public MemberTokenDto changeAuth(Long companyId, Long authNo) {
        Company requestAuth = companyRepository.findById(companyId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_COMPANY));

        Role role = getRoleByAuthNo(authNo);

        Company company = companyRepository.findByMemberIdAndRole(requestAuth.getMember().getId(), role)
                .orElseThrow(() -> new BaseException(StatusCode.COMPANY_ROLE_NOT_MATCH));

        MemberTokenDto response = jwtTokenProvider.regenerateCompanyToken(company, role);
        response.setName(company.getName());
        response.setAddress(company.getAddress());
        response.setId(company.getId());
        response.setWho(-1);
        List<Role> roleList = new ArrayList<>();
        roleList.add(role);
        response.setRoleList(roleList);
        response.setProfileImage(company.getImageUrl());
        return response;

    }

    private boolean isVerify(AuthCodeRequestDto requestDto) {
        return !(redisService.hasKey(requestDto.getPhone()) &&
                redisService.getSmsCertification(requestDto.getPhone())
                        .equals(requestDto.getCode()));
    }

    private Role getRoleByAuthNo(Long authNo) {
        if (authNo == -1) { // AUTH_NO_FOR_CLEAN is a constant, e.g., -1
            return Role.CLEAN;
        }
        return Role.DELIVER;
    }
}
