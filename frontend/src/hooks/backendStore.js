import create from 'zustand';
import axios from 'axios';
import useStore from './useStore';

const userLoginInformation = JSON.parse(
  localStorage.getItem('userLoginInformation') || '{}'
);

const backendStore = create((set, get) => ({
  userData: null,
  userLoginInformation: userLoginInformation,
  isError: '',
  isLoading: false,
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/',
  userMidiData: null,

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
        get().getMidiData(token);
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

  getMidiData: async token => {
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
          userMidiData: response.data,
        });
      }
    } catch {
      set({
        isLoading: false,
        isError: "Can't load favorites. Please try again",
      });
    }
  },
  setMidiData: async midiDataName => {
    set({ isLoading: true });
    set({ isError: '' });
    const API_URL = get().API_URL + 'midiData';
    const token = userLoginInformation.token;
    const { assignedMIDIControls } = useStore.getState();
    console.log('midi data bevor sie in backend gehen', assignedMIDIControls)
    try {
      const response = await axios.post(
        API_URL,
        { text: midiDataName, midiData: assignedMIDIControls },

        {
          //Pass Authentication Bearer token in header
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        get().getMidiData(token);
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Something went wrong. Please try again!',
      });
    }
  },
  deleteMidiData: async (midiConfig) => {
    set({ isLoading: true });
    set({ isError: '' });
    const API_URL = get().API_URL + `midiData/${midiConfig}`;
    const token = userLoginInformation.token;

    try {
      const response = await axios.delete(
        API_URL,
        {
          //Pass Authentication Bearer token in header
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        get().getMidiData(token);
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Something went wrong. Please try again!',
      });
    }
  },
}));

if (Object.keys(userLoginInformation).length !== 0) {
  backendStore.getState().getUserData(userLoginInformation.token);
}

export default backendStore;
