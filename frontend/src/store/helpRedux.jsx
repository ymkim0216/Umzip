import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit'


let helps = createSlice({
    name : 'helps',
    initialState: {
      list : [
      {
        id: 1,
        userName: '베어그릴스',
        title: '바퀴잡아주세요',
        point: 100,
        category: 1, // 1helpme, 2helpyou, 3done
        date: '2024-02-03',
        view: 13,
        comment: 2,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '집에 바쿠ㅣㅣㅣ으ㅏ아조ㅓㅁ잡ㅇ저요.',
        image:['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      },
      {
        id: 2,
        userName: '커비',
        title: '대신먹어드립니다.',
        point: 100,
        category: 2, // 1helpme, 2helpyou, 3done
        date: '2024-01-25',
        view: 72,
        comment: 12,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 도봉구 도봉동', // 피그마에는 없는데 필요하겠지?
        content:
          '먹기싫은 음식 대신 먹어드립니다.',
        image:
          '',
      },
      {
        id: 3,
        userName: '장현욱',
        title: '개발자 1대1강의좀 해주세요',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너무 어렵네요 좀 해주시죠.',
        image:
          '',
      },
      {
        id: 4,
        userName: ',사쪽이',
        title: '4등분해주세요',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-06',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너무 어렵네요 좀 해주시죠.',
        image:
          '',
      },
      {
        id: 5,
        userName: '오동',
        title: '오동통통',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너구리드세요.',
        image:
          '',
      },
      {
        id: 6,
        userName: '육개장',
        title: '육개장만들어줘요',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너무 어렵네요 좀 해주시죠.',
        image:
          '',
      },
      {
        id: 7,
        userName: '칠면조',
        title: 'KFC털이도와줘요',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '우리 선조의 원수.',
        image:
          '',
      },
      {
        id: 8,
        userName: '팔보채',
        title: '요리해주세용',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너무 어렵네요 좀 해주시죠.',
        image:
          '',
      },
      {
        id: 9,
        userName: '비둘기',
        title: '구구구구 구구 구구구구',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '뭐요.',
        image:
          '',
      },
      {
        id: 10,
        userName: '싸피10기생',
        title: '개발자 1대1강의좀 해주세요',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너무 어렵네요 좀 해주시죠.',
        image:
          '',
      },
      {
        id: 11,
        userName: '십일',
        title: '개발자 1대1강의좀 해주세요',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너무 어렵네요 좀 해주시죠.',
        image:
          '',
      },
      {
        id: 12,
        userName: '신데렐라',
        title: '이제벌써 1 2 시 네',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '유리구두 ㅅㅅ.',
        image:
          '',
      },
      {
        id: 13,
        userName: '삼시세끼',
        title: '개발자 1대1강의좀 해주세요',
        point: 100,
        category: 3, // 1helpme, 2helpyou, 3done
        date: '2024-01-01',
        view: 1,
        comment: 1,
        // comment: ?? 댓글 다른데서 불러오나 아님 딕셔너리 번호에 붙어있나
        region: '서울 강남 강남구청', // 피그마에는 없는데 필요하겠지?
        content:
          '너무 어렵네요 좀 해주시죠.',
        image:
          '',
      },
    ],
  filter:'',
},
    reducers : {
      // goHelpsDetail(state, action){
      //   // action은 함수(받는숫자) 에서 받는숫자가 action임
      //   let helpsDetail = state.findIndex((a)=>{return a.id === action.payload})
      //   console.log(helpsDetail)
      // },
      helpFilter(state, action) {
        state.filter = action.payload
      }
    }
})

// 필터링된 helps 항목을 선택하는 셀렉터
export const selectFilteredHelps = createSelector(
  // 첫번쨰 인자는 배열로, 스토어에서 필요한 부분을 선택
  // state.helps.list와 state.helps.fulter를 선택
  // 
  [(state) => state.helps.list, (state) => state.helps.filter],
  // list,fulter를 받아 필터링 로직수행
  (list, filter) => {
    // 필터가 비어있지 않다면 밑에 리턴을 수행
    // 그게 아니면 리스트
    if (!filter) return list;
    // 소문자로 변환, title과userName에서 필터
    return list.filter((help) => {
      const searchTerm = filter.toLowerCase();
      return help.title.toLowerCase().includes(searchTerm) || help.userName.toLowerCase().includes(searchTerm);
    });
  }
);

export const { goHelpsDetail, helpFilter } = helps.actions

export default helps