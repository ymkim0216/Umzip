import { create } from 'zustand';
import axios from 'axios';


// 디테일 페이지 가져온 정보
const useStore = create((set, get) => ({
  data: [],
  loading: false,
  error: null,
  token: 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY4MzY2MTUsImV4cCI6MTcwNzI2ODYxNX0.5jG0Us4yKDSTowVlebRwW1iP03py78fdSdPCcRTzKnk',

  // 매번 다르게 요청하기위한 변수 설정
  boardId: 0, // 검색 키워드 상태
  setBoardId: (boardId) => set({ boardId }), // 검색 키워드를 업데이트하는 함수

  fetchData: async () => {
    const { boardId } = get();
    set({ loading: true });
    try {
        // 도메인주소로 할시에는 https로 바꿔줘야함
      const response = await axios.get(`http://192.168.30.206:8080/api/helps/detail/${boardId}`,
      {headers: {
        Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY4MzY2MTUsImV4cCI6MTcwNzI2ODYxNX0.5jG0Us4yKDSTowVlebRwW1iP03py78fdSdPCcRTzKnk`
      }});
      set({ data: response.data, loading: false },
        console.log(response.data));
    } catch (error) {
      set({ error, loading: false });
    }
  },

    // 댓글을 게시하는 함수
    sendPostRequest: async (commentText) => {
      const { boardId } = get();
      const url = `http://192.168.30.206:8080/api/helps/detail/comments/${boardId}`;
      const commentData = commentText

      set({ loading: true });
      try {
        const response = await axios.post(url, commentData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY4MzY2MTUsImV4cCI6MTcwNzI2ODYxNX0.5jG0Us4yKDSTowVlebRwW1iP03py78fdSdPCcRTzKnk`
          }
        });
        console.log('댓글 추가됨:', response.data);
        set({ loading: false });
        // 여기에서 추가적인 상태 업데이트나 액션을 취할 수 있습니다.
        // 예: 새로운 댓글 데이터를 상태에 추가하는 등
      } catch (error) {
        console.error('댓글 추가 실패:', error.response?.data || error);
  alert(error.response?.data?.message || '댓글 추가 중 오류가 발생했습니다.');
        set({ error, loading: false });
      }
    }
}));

export default useStore;
