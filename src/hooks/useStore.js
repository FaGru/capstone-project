import create from 'zustand';
import * as Tone from 'tone';
import { nanoid } from 'nanoid';
import { defaultPadSettings } from '../data';
import { defaultSequencerSettings } from '../data';

const useStore = create(set => ({
  tone: null,
  dest: null,
  recorder: null,
  loopPlayer: null,
  currentDrumLoop: 'DrumLoop90BPM',
  loopPlayerVolume: 5,
  recordings: [],
  allPads: defaultPadSettings,
  drumPadPlayersVolume: 5,
  allPadSequences: defaultSequencerSettings,
  selectedSequencerPad: 0,
  currentTimeStamp: 0,
  currentBpm: 100,
  selectedPadSequence: defaultSequencerSettings[0].settings,
  isInstructionPopUpVisible: true,
  isInstructionOneVisible: false,
  isInstructionTwoVisible: false,
  isInstructionThreeVisible: false,
  isInstructionFourVisible: false,
  isInstructionFiveVisible: false,

  deleteRecording: recording => {},

  handleUserInteraction: () => {
    const handleUserInteraction = () => {
      const tone = useStore.getState().tone;
      if (!tone) {
        useStore.getState().initTone();
        useStore.getState().initLoopPlayer();
        useStore.getState().initDrumPadPlayers();
      }
    };
    window.addEventListener('click', handleUserInteraction);
    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  },
  initTone: () => {
    const tone = Tone.context;
    tone._latencyHint = 'balanced';
    const dest = tone.createMediaStreamDestination();
    const recorder = new MediaRecorder(dest.stream);

    set({ tone, dest, recorder });
  },

  ///////     init DrumPadPlayers, set PadSettings and Volume    /////////
  initDrumPadPlayers: () => {
    const allPads = useStore.getState().allPads;
    const drumPadPlayersVolume = useStore.getState().drumPadPlayersVolume;
    const drumPadPlayers = new Tone.Players(
      {
        Player0: allPads[0].sample,
        Player1: allPads[1].sample,
        Player2: allPads[2].sample,
        Player3: allPads[3].sample,
        Player4: allPads[4].sample,
        Player5: allPads[5].sample,
        Player6: allPads[6].sample,
        Player7: allPads[7].sample,
        Player8: allPads[8].sample,
        Player9: allPads[9].sample,
        Player10: allPads[10].sample,
        Player11: allPads[11].sample,
      },
      {
        volume: drumPadPlayersVolume - 5,
      }
    ).toDestination();
    const dest = useStore.getState().dest;
    drumPadPlayers.connect(dest);
    set({ drumPadPlayers });
  },
  getAllPads: allPads => {
    set({ allPads: allPads });
  },
  getDrumPadPlayersVolume: drumPadPlayersVolume => {
    const loopPlayer = useStore.getState().drumPadPlayers;
    loopPlayer.volume.value = drumPadPlayersVolume - 5;
    set({ drumPadPlayersVolume: drumPadPlayersVolume });
  },

  ////////    init LoopPlayer, set DrumLoop and Volume    //////////
  initLoopPlayer: () => {
    const loopPlayer = new Tone.Player(
      `./audio/DrumLoops/${useStore.getState().currentDrumLoop}.wav`
    ).toDestination();
    const dest = useStore.getState().dest;
    loopPlayer.connect(dest);
    loopPlayer.loop = true;
    set({ loopPlayer });
  },
  getCurrentDrumLoop: currentDrumLoop => {
    set({ currentDrumLoop: currentDrumLoop });
  },
  getLoopPlayerVolume: loopPlayerVolume => {
    const loopPlayer = useStore.getState().loopPlayer;
    loopPlayer.volume.value = loopPlayerVolume - 5;
    set({ loopPlayerVolume: loopPlayerVolume });
  },

  //////////////////    save and add recordings    //////////////////////
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
  addRecording: recording => {
    set(state => ({ recordings: [recording, ...state.recordings] }));
  },

  //////////////////    Instructions    //////////////////////
  setIsInstructionNavVisible: isInstructionNavVisible => {
    set({ isInstructionNavVisible: isInstructionNavVisible });
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

  ////////////////    Sequencer    //////////////////////

  getAllPadSequences: allPadSequences => {
    set({ allPadSequences: allPadSequences });
  },
  getSelectedSequencerPad: selectedSequencerPad => {
    set({ selectedSequencerPad: selectedSequencerPad });
  },
  getCurrentTimeStamp: currentTimeStamp => {
    set({ currentTimeStamp: currentTimeStamp });
  },
  getSelectedPadSequence: selectedPadSequence => {
    set({ selectedPadSequence: selectedPadSequence });
  },
  getCurrentBpm: currentBpm => {
    Tone.Transport.bpm.value = currentBpm;
    set({ currentBpm: currentBpm });
  },
}));

export default useStore;
