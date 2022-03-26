import create from 'zustand';
import * as Tone from 'tone';

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
