import { create } from 'zustand';
import { api } from '../services/api';

const useStoreDelivery = create((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async () => {

    set({ loading: true });
    try {
        // 도메인주소로 할시에는 https로 바꿔줘야함
      const response = await api.get(`/delivery/company/reservation`,
      );
      set({ data: response.data, loading: false },
        // console.log(response.data)
        );
    } catch (error) {
      set({ error, loading: false }
        );
    }
  },

    // 데이터를 수동으로 업데이트하는 메소드 추가
    updateData: (updatedData) => {
      set({ data: updatedData });
    }

}));

export default useStoreDelivery;