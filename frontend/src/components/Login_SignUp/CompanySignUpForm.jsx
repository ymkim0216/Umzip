import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import DaumPostcode from 'react-daum-postcode';
import { PRIMARY_COLOR } from '../../App';

const CompanySignUpForm = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const [serviceButton, setserviceButton] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addressDetailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    setLoading(true);

    // 모든 확인 절차가 완료되었는지 확인
    if (!isEmailValid || !isPhoneCodeSent || !isPhoneCodeVerified) {
      alert(
        '이메일 중복 검사, 핸드폰 인증 코드 전송, 인증 코드 검증을 모두 완료해야 합니다.'
      );
      return;
    }

    const { name, email, phone, password } = data;
    try {
      const response = await axios.post(
        'http://192.168.30.145:8080/api/users',
        {
          name,
          email,
          phone,
          password,
          address,
          sigungu,
          addressDetail,
        }
      );

      if (response.data.isSuccess) {
        alert('Join Success!');
        navigate('/login');
      } else {
        let message = response.data.message;
        alert(message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
    setLoading(false);
  };

  const handleButtonClick = (buttonType) => {
    if (selectedButton === 'normal') {
      setserviceButton('');
    }
    setSelectedButton(buttonType);
  };

  const handleServiceClick = (buttonType) => {
    setserviceButton(buttonType);
  };

  function onCompletePost(data) {
    let fullAddress = '';
    let extraAddress = '';
    setSigungu(data.sigunguCode);

    if (data.userSelectedType === 'R') {
      // 사용자가 도로명 주소를 선택했을 경우
      fullAddress = data.roadAddress;
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      fullAddress = data.jibunAddress;
    }

    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
    if (data.userSelectedType === 'R') {
      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddress += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddress +=
          extraAddress !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddress !== '') {
        extraAddress = ' (' + extraAddress + ')';
      }

      setIsModalOpen(false);
      setAddress(fullAddress + extraAddress);
      if (addressDetailRef.current) {
        addressDetailRef.current.focus();
      }
    }
  }

  const handleAddressChange = (event) => {
    setAddressDetail(event.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            zIndex: '1',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색 및 투명도 조절
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '40%',
              backgroundColor: 'white', // 내용의 배경색
              padding: '20px',
              borderRadius: '8px', // 내용의 모서리 둥글게
            }}
          >
            <DaumPostcode onComplete={onCompletePost} />
          </div>
        </motion.div>
      )}
      <div
        className="container"
        style={{ marginTop: '100px', marginBottom: '100px' }}
      >
        <div className="row justify-content-center">
          <div className="col-md-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded p-4 border shadow-sm mx-auto"
              style={{ width: '100%', maxWidth: '70%' }}
            >
              <div className="form-group mb-4">
                <label htmlFor="name">업체 이름</label>
                <input
                  id="name"
                  className="form-control rounded-pill py-4"
                  type="text"
                  placeholder="업체 이름"
                  {...register('name', {
                    required: '이름을 입력해주세요',
                    pattern: {
                      value: /^[가-힣]{2,6}$/,
                      message: '이름 형식에 맞지 않습니다.',
                    },
                  })}
                />
                {errors.name && (
                  <small role="alert" aria-live="assertive">
                    {errors.name.message}
                  </small>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email">이메일</label>
                <div className="input-group" style={{ zIndex: '0' }}>
                  <input
                    id="email"
                    className="form-control rounded-pill py-4"
                    type="text"
                    placeholder="test@email.com"
                    {...register('email', {
                      required: '이메일은 필수 입력입니다.',
                      pattern: {
                        value:
                          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/,
                        message: '이메일 형식에 맞지 않습니다.',
                      },
                    })}
                    value={email}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill py-3"
                    style={{
                      marginLeft: '-1px',
                      backgroundColor: PRIMARY_COLOR,
                    }}
                  >
                    중복 확인
                  </button>{' '}
                  <br />
                </div>
                {errors.email && (
                  <small role="alert" aria-live="assertive">
                    {errors.email.message}
                  </small>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="phone">핸드폰번호</label>
                <div className="input-group" style={{ zIndex: '0' }}>
                  <input
                    id="phone"
                    className="form-control rounded-pill py-4"
                    type="text"
                    placeholder="010-1234-5678"
                    {...register('phone', {
                      required: '핸드폰번호는 필수 입력입니다.',
                      pattern: {
                        value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                        message: '올바른 형식이 아닙니다',
                      },
                    })}
                    value={phone}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill py-3"
                    style={{
                      marginLeft: '-1px',
                      backgroundColor: PRIMARY_COLOR,
                    }}
                  >
                    Send Code
                  </button>{' '}
                  <br />
                </div>
                {errors.phone && (
                  <small role="alert" aria-live="assertive">
                    {errors.phone.message}
                  </small>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="enterCode">Enter Code</label>
                <div className="input-group" style={{ zIndex: '0' }}>
                  <input
                    type="text"
                    className="form-control rounded-pill py-4"
                    id="enterCode"
                    placeholder="Enter code"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill py-3"
                    style={{
                      marginLeft: '-1px',
                      backgroundColor: PRIMARY_COLOR,
                    }}
                  >
                    Verify Code
                  </button>
                </div>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  className="form-control rounded-pill py-4"
                  type="password"
                  placeholder="*******"
                  {...register('password', {
                    required: '비밀번호는 필수 입력입니다.',
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                      message:
                        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요',
                    },
                  })}
                />
                {errors.password && (
                  <small role="alert" aria-live="assertive">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="passwordCheck">비밀번호 확인</label>
                <input
                  id="passwordCheck"
                  className="form-control rounded-pill py-4"
                  type="password"
                  placeholder="*******"
                  {...register('passwordCheck', {
                    validate: (value) =>
                      value === password.current ||
                      '비밀번호가 일치하지 않습니다.',
                  })}
                />
                {errors.passwordCheck && (
                  <small role="alert" aria-live="assertive">
                    {errors.passwordCheck.message}
                  </small>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="region">주소</label>
                <input
                  id="address"
                  className="form-control rounded-pill py-4"
                  type="text"
                  onClick={() => setIsModalOpen(true)}
                  readOnly="readonly"
                  placeholder={address ? address : '기본주소'}
                  required
                />
                <br />
                <input
                  id="addressDetail"
                  ref={addressDetailRef}
                  className="form-control rounded-pill py-4"
                  type="text"
                  placeholder={addressDetail ? addressDetail : '상세주소'}
                  onChange={handleAddressChange}
                  value={addressDetail}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySignUpForm;
