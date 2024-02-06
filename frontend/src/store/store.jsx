import { create } from 'zustand';
import { api } from '../services/api';

const useAuthStore = create((set) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = localStorage.getItem('token');

  return {
    user: userInfo.email ? userInfo : null,
    token: token,
    isLoading: false,
    error: null,
    login: async (email, pwd, navigate, rememberMe) => {
      set({ isLoading: true, error: null });
      try {
        const response = await api.post('/login', { email, pwd });
        const { who, accessToken, refreshToken, name, profileImage, roleList } = response.data.result;
        const storage = rememberMe ? localStorage : sessionStorage;
    
        storage.setItem('token', accessToken);
        storage.setItem('refreshToken', refreshToken);
    
        const userInfo = { who, email, name, profileImage, roleList };
        storage.setItem('userInfo', JSON.stringify(userInfo));
    
        set({ user: userInfo, token: accessToken, isLoading: false });

        // 액세스 토큰 만료 시간을 고정값으로 설정 (예: 3600초)
        const expiresIn = 3600 * 24 * 5; // 5일
        setTimeout(async () => {
          await refreshToken(); // 토큰 갱신 함수 호출
        }, (expiresIn - 60) * 1000); // 만료 1분 전에 갱신
        { who === 1 ?
        navigate('/dashboard'):
        navigate(`/dashbordcompany`)
        }
      } catch (error) {
        console.error('Login error:', error);
        set({
          error: error.response?.data?.message || 'Login failed',
          isLoading: false,
        });
      }
    },

    logout: () => set({ user: null, token: null }),
  };
});

export default useAuthStore;
