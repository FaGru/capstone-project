import create from 'zustand';
import axios from 'axios';

const userLoginInformation = JSON.parse(
  localStorage.getItem('userLoginInformation') || '{}'
);

const backendStore = create((set, get) => ({
  userData: null,
  userLoginInformation: userLoginInformation,
  isError: '',
  isLoading: false,
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/',
  savedMidiData: null,


  register: async formData => {
    set({ isLoading: true });
    set({ isError: '' });
    const API_URL = get().API_URL + 'user';
    try {
      const response = await axios.post(API_URL, formData);
      if (response.data) {
        localStorage.setItem(
          'userLoginInformation',
          JSON.stringify(response.data)
        );
        get().getUserData(response.data.token);
        set({
          isLoading: false,
          isError: '',
          userLoginInformation: response.data,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Something went wrong. Please try again!',
      });
    }
  },
  login: async formData => {
    set({ isLoading: true });
    set({ isError: '' });
    const API_URL = get().API_URL + 'user/login';
    try {
      const response = await axios.post(API_URL, formData);
      if (response.data) {
        localStorage.setItem(
          'userLoginInformation',
          JSON.stringify(response.data)
        );
        get().getUserData(response.data.token);
        set({
          isLoading: false,
          isError: '',
          userLoginInformation: response.data,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'E-Mail or password is invalid',
      });
    }
  },

  getUserData: async token => {
    set({ isLoading: true, isError: '' });
    const API_URL = get().API_URL + 'user/me';
    try {
      const response = await axios.get(API_URL, {
        //Pass Authentication Bearer token in header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        set({ isLoading: false, isError: '', userData: response.data });
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Can not get User Data. Please try again',
      });
    }
  },
  logOut: () => {
    localStorage.removeItem('userLoginInformation');
    set({ userLoginInformation: {}, userData: null });
  },


  getSavedMidiData: async (token) => {

    set({ isLoading: true, isError: '' });
    const API_URL = get().API_URL + 'midiData';

    try {
      const response = await axios.get(API_URL, {
        //Pass Authentication Bearer token in header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        set({
          isLoading: false,
          isError: '',
          savedMidiData: response.data,
        });
      }
    } catch {
      set({
        isLoading: false,
        isError: "Can't load favorites. Please try again",
      });
    }
  },
}));

if (Object.keys(userLoginInformation).length !== 0) {
  backendStore.getState().getUserData(userLoginInformation.token);
}

export default backendStore;
