import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from 'react-router-dom';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoView from '../Service/Delivery/PhotoView';
import DaumPostcode from 'react-daum-postcode';
import classes from './TradeForm.module.css';

function TradeForm({ method, trade }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const isSubmitting = navigation.state === 'submitting';

  const [selectedOption, setSelectedOption] = useState('직거래');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [address, setAddress] = useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function cancelHandler() {
    navigate('/trade');
  }

  function onCompletePost(data) {
    let fullAddress = data.address;
    let sigungu = data.sigungu;
    let sigunguCode = data.sigunguCode;

    // console.log(sigungu + sigunguCode)
    setIsModalOpen(false);
    setAddress(fullAddress);
  }

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
      <Form method={method} className={classes.form}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <h2
          style={{
            marginTop: '4rem',
            borderBottom: 'solid',
            borderColor: '#B2B2B2',
            borderWidth: '1px',
          }}
        >
          글작성
        </h2>
        <article>
          <p>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="제목을 작성해 주세요"
              style={{
                backgroundColor: '#F6F6F6',
                border: 'none',
                outline: 'none',
                borderRadius: '4px',
              }}
              required
            ></input>
          </p>
          <div style={{ fontWeight: 'bold' }}>상세 설정</div>
          <div className={classes.option}>
            <input
              id="cost"
              type="int"
              name="cost"
              placeholder="판매 가격"
              style={{
                backgroundColor: '#F6F6F6',
                border: 'none',
                outline: 'none',
                borderRadius: '4px',
              }}
              required
            />
            <div className={classes.radioContainer}>
              <input
                type="radio"
                value="option1"
                checked={selectedOption === 'option1'}
                onChange={handleRadioChange}
              />
              <label>직거래</label>

              <input
                type="radio"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleRadioChange}
              />
              <label>택배</label>
            </div>
          </div>
          <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 'bold' }}>거래 장소 지정</div>
            <div className={classes.place}>
              <input
                id="region"
                type="text"
                name="region"
                placeholder={address ? address : '직거래 주소'}
                style={{
                  backgroundColor: '#F6F6F6',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '4px',
                  width: '80%'
                }}
                required
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary"
              >
                주소 검색
              </button>
            </div>
          </div>
        </article>
        <div
          style={{
            border: 'solid',
            borderWidth: '1px 0 1px 0',
            borderColor: '#B2B2B2',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className="m-0 fw-bold">사진 추가</div>
            <div
              style={{
                marginLeft: '0.5rem',
                fontSize: 'small',
                color: '#3FA3CF',
              }}
            >
              특징이 잘 드러나도록 촬영해주세요.
            </div>
          </div>
          <div className="d-flex gap-2  text-center">
            <div className="col-9 d-flex">
              <PhotoView
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            </div>
          </div>
        </div>
        <p style={{ marginTop: '0.5rem' }}>
          <label htmlFor="description" style={{ fontWeight: 'bold' }}>
            상세 내용 작성
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            style={{
              borderColor: '#B2B2B2',
              borderRadius: '4px',
              resize: 'none',
              outline: 'none',
            }}
          />
        </p>
        <div className={classes.actions}>
          <button className={classes.cancle} type="button" onClick={cancelHandler} disabled={isSubmitting}>
            취소
          </button>
          <button className={classes.save} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : '저장'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default TradeForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const method = request.method;

  let url = 'http://localhost:8080/trade';

  if (method === 'PATCH') {
    const tradeId = params.tradeId;
    url += `/${tradeId}`;
  }

  const response = await fetch(url, {
    method: method,
    body: formData,
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save trade.' }, { status: 500 });
  }

  return redirect('/trade');
}
