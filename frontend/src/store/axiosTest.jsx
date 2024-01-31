import { create } from 'zustand';
import axios from 'axios';

const useStore = create(set => ({
  data: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true });
    try {
        // 도메인주소로 할시에는 https로 바꿔줘야함
      const response = await axios.get('http://192.168.30.206:8080/api/helps?code-small=0&keyword=흠&page=1&size=10');
      set({ data: response.data, loading: false },
        console.log(response));
    } catch (error) {
      set({ error, loading: false });
    }
  }
}));

export default useStore;