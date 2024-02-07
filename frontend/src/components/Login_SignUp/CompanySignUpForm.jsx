import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import DaumPostcode from 'react-daum-postcode';

const CompanySignUpForm = ({ companyType, onCompanyDataSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [companyName, setCompanyName] = useState('');
  // const [address, setAddress] = useState('');
  // const [addressDetail, setAddressDetail] = useState('');
  // const [sigungu, setSigungu] = useState('');
  // const addressDetailRef = useRef(null);
  // const [introduction, setIntroduction] = useState('');
  // const [startDate, setStartDate] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, [companyType, reset]);

  const handleFormSubmit = (data) => {
    onCompanyDataSubmit(data);
  };

  // const handleIntroductionChange = (event) => {
  //   setIntroduction(event.target.value);
  // };

  // const handleStartDateChange = (event) => {
  //   setStartDate(event.target.value);
  // };

  const onCompletePost = (data) => {
    let fullAddress = data.roadAddress || data.jibunAddress;
    let extraAddress = '';

    if (
      data.userSelectedType === 'R' &&
      data.bname &&
      /[동|로|가]$/g.test(data.bname)
    ) {
      extraAddress += data.bname;
    }
    if (data.buildingName && data.apartment === 'Y') {
      extraAddress += extraAddress
        ? ', ' + data.buildingName
        : data.buildingName;
    }
    fullAddress += extraAddress ? ` (${extraAddress})` : '';

    setIsModalOpen(false);
    setValue('address', fullAddress);
    setValue('sigungu', data.sigunguCode);
  };

  // const handleAddressChange = (event) => {
  //   setAddressDetail(event.target.value);
  // };

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
      <form
        onSubmit={handleSubmit(handleFormSubmit)} // Use handleSubmit from react-hook-form
        className="rounded p-4 border shadow-sm mx-auto"
        style={{ width: '100%', maxWidth: '70%' }}
      >
        <div className="form-group mb-4">
          <label htmlFor="companyName">업체 이름</label>
          <input
            id="companyName"
            className="form-control rounded-pill py-4"
            type="text"
            placeholder="업체 이름"
            {...register('companyName', {
              required: '업체 이름을 입력해주세요',
            })}
          />
          {errors.companyName && (
            <small role="alert" aria-live="assertive">
              {errors.companyName.message}
            </small>
          )}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="introduction">소개글</label>
          <div className="input-group" style={{ zIndex: '0' }}>
            <input
              id="introduction"
              className="form-control rounded-pill py-4"
              type="text"
              placeholder="소개글을 작성해주세요."
              {...register('introduction', {
                required: '소개글을 입력해주세요',
              })}
            />
            {errors.introduction && (
              <small role="alert">{errors.introduction.message}</small>
            )}
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="startDate">서비스 시작년도</label>
          <div className="input-group" style={{ zIndex: '0' }}>
            <input
              id="startDate"
              className="form-control rounded-pill py-4"
              type="date"
              placeholder="2000-01-01"
              {...register('startDate', {
                required: '서비스 시작년도를 입력해주세요',
              })}
            />
            {errors.startDate && (
              <small role="alert">{errors.startDate.message}</small>
            )}
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="ceo">사업자명</label>
          <input
            id="ceo"
            className="form-control rounded-pill py-4"
            type="text"
            placeholder="사업자명"
            {...register('ceo', {
              required: '사업자명을 입력해주세요',
              pattern: {
                value: /^[가-힣]{2,6}$/,
                message: '이름 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.ceo && (
            <small role="alert" aria-live="assertive">
              {errors.ceo.message}
            </small>
          )}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="address">업체주소</label>
          <input
            id="address"
            className="form-control rounded-pill py-4"
            type="text"
            onClick={() => setIsModalOpen(true)}
            readOnly
            {...register('address', {
              required: '업체주소를 입력해주세요',
            })}
            placeholder="기본주소"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="addressDetail">상세주소</label>
          <input
            id="addressDetail"
            className="form-control rounded-pill py-4"
            type="text"
            {...register('addressDetail')}
            placeholder="상세주소"
          />
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </>
  );
};

export default CompanySignUpForm;
