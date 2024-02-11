import { create } from 'zustand';
import { api } from '../services/api';

const replyStore = create((set, get) => ({
  data: [],
  loading: false,
  error: null,
  submitReplyStore: async (role, mappingId, price, detail) => {
    const quotation = {        
        mappingId: mappingId,
        price : price,
        detail: detail
}

    set({ loading: true });
    try {
        // 도메인주소로 할시에는 https로 바꿔줘야함
      const response = await api.put(`/${role}/company/quotation`, quotation
      );
      set({ data: response.data, loading: false },
        console.log(response.data));
    } catch (error) {
      set({ error, loading: false });
    }
  }
}));

export default replyStore;