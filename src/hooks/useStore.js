import create from 'zustand';
import * as Tone from 'tone';
import { nanoid } from 'nanoid';

const useStore = create(set => ({
  tone: null,
  dest: null,
  recorder: null,
  recordings: [],
  isInstructionPopUpVisible: true,
  isInstructionOneVisible: false,
  isInstructionTwoVisible: false,
  isInstructionThreeVisible: false,
  isInstructionFourVisible: false,
  isInstructionFiveVisible: false,
  addRecording: recording => {
    set(state => ({ recordings: [recording, ...state.recordings] }));
  },
  deleteRecording: recording => {},

  initTone: () => {
    const tone = Tone.context;
    const dest = tone.createMediaStreamDestination();
    const recorder = new MediaRecorder(dest.stream);
    set({ tone, dest, recorder });
  },
  handleUserInteraction: () => {
    const handleUserInteraction = () => {
      const tone = useStore.getState().tone;
      if (!tone) {
        useStore.getState().initTone();
      }
    };
    window.addEventListener('mousemove', handleUserInteraction);
    return () => {
      window.removeEventListener('mousemove', handleUserInteraction);
    };
  },

  saveRecording: () => {
    const recorder = useStore.getState().recorder;
    const chunks = [];
    if (recorder) {
      recorder.ondataavailable = event => chunks.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
        const audio = URL.createObjectURL(blob);
        useStore.getState().addRecording({
          id: nanoid(),
          audio: audio,
        });
      };
    }
  },

  //////////////////    Instructions    //////////////////////
  setInstructionPopUpVisible: isInstructionPopUpVisible => {
    set({ isInstructionPopUpVisible: isInstructionPopUpVisible });
  },
  setInstructionOneVisible: isInstructionOneVisible => {
    set({ isInstructionOneVisible: isInstructionOneVisible });
  },
  setInstructionTwoVisible: isInstructionTwoVisible => {
    set({ isInstructionTwoVisible: isInstructionTwoVisible });
  },
  setInstructionThreeVisible: isInstructionThreeVisible => {
    set({ isInstructionThreeVisible: isInstructionThreeVisible });
  },
  setInstructionFourVisible: isInstructionFourVisible => {
    set({ isInstructionFourVisible: isInstructionFourVisible });
  },
  setInstructionFiveVisible: isInstructionFiveVisible => {
    set({ isInstructionFiveVisible: isInstructionFiveVisible });
  },
}));

export default useStore;
