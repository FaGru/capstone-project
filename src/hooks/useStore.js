import create from 'zustand'
import * as Tone from 'tone';

const useStore = create(set => ({
  tone: null,
  dest: null,
  recorder: null,
  recordings: [],
  addRecording: (recording) => {
    set(state => ({recordings: [recording, ...state.recordings]}))
  },
  deleteRecording: (recording) => {
    
  },
  initTone: () => { 
    const tone = Tone.context
    const dest = tone.createMediaStreamDestination()
    const recorder = new MediaRecorder(dest.stream)
    set({ tone, dest, recorder })}
}))

export default useStore