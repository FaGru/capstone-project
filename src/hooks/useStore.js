import create from 'zustand';
import * as Tone from 'tone';
import { nanoid } from 'nanoid';
import { defaultPadSettings } from '../data';
import { defaultSequencerSettings } from '../data';

const useStore = create((set, get) => ({
  tone: null,
  dest: null,
  recorder: null,
  loopPlayer: null,
  monoSynth: null,
  synth: null,
  djPlayerOne: null,
  djPlayerTwo: null,
  eq3One: null,
  djTrackOne: 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
  djTrackTwo: 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
  faderPosition: 0,
  eqOneSettings: { high: 0, mid: 0, low: 0 },
  eqTwoSettings: { high: 0, mid: 0, low: 0 },
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
  currentSequencerVolume: 0,
  keyboardVolume: 5,
  isInstructionPopUpVisible: true,
  isInstructionOneVisible: false,
  isInstructionTwoVisible: false,
  isInstructionThreeVisible: false,
  isInstructionFourVisible: false,
  isInstructionFiveVisible: false,
  navDirection: { start: 'initialBottom', end: 'outBottom' },

  handleUserInteraction: () => {
    const handleUserInteraction = () => {
      const tone = get().tone;
      if (!tone) {
        get().initTone();
        get().initKeyboard();
        get().initLoopPlayer();
        get().initDrumPadPlayers();
        get().initDJPlayerOne();
        get().initDJPlayerTwo();
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
    const allPads = get().allPads;
    const drumPadPlayersVolume = get().drumPadPlayersVolume;
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
    const dest = get().dest;
    drumPadPlayers.connect(dest);
    set({ drumPadPlayers });
  },
  setAllPads: allPads => {
    set({ allPads: allPads });
  },
  setDrumPadPlayersVolume: drumPadPlayersVolume => {
    const DrumPadPlayers = get().drumPadPlayers;
    DrumPadPlayers.volume.value = drumPadPlayersVolume - 5;
    set({ drumPadPlayersVolume: drumPadPlayersVolume });
  },
  ////////////////    Keyboard    //////////////////////
  initKeyboard: () => {
    const dest = get().dest;
    const keyboardVolume = get().keyboardVolume;
    const monoSynth = new Tone.MonoSynth({
      volume: keyboardVolume - 8,
      detune: 0,
      portamento: 0,
      envelope: {
        attack: 0.05,
        attackCurve: 'linear',
        decay: 0.3,
        decayCurve: 'exponential',
        release: 0.8,
        releaseCurve: 'exponential',
        sustain: 0.4,
      },
      filter: {
        Q: 1,
        detune: 0,
        frequency: 0,
        gain: 0,
        rolloff: -12,
        type: 'lowpass',
      },
      filterEnvelope: {
        attack: 0.001,
        attackCurve: 'linear',
        decay: 0.7,
        decayCurve: 'exponential',
        release: 0.8,
        releaseCurve: 'exponential',
        sustain: 0.1,
        baseFrequency: 300,
        exponent: 2,
        octaves: 4,
      },
      oscillator: {
        detune: 0,
        frequency: 700,
        partialCount: 8,
        partials: [
          1.2732395447351628, 0, 0.4244131815783876, 0, 0.25464790894703254, 0,
          0.18189136353359467, 0,
        ],
        phase: 0,
        type: 'square8',
      },
    }).toDestination();
    monoSynth.connect(dest);

    const synth = new Tone.Synth({
      volume: keyboardVolume - 8,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        release: 1.5,
        releaseCurve: 'exponential',
        sustain: 0.2,
      },
      oscillator: {
        partialCount: 0,
        partials: [],
        phase: 0,
        type: 'amtriangle',
        harmonicity: 0.5,
        modulationType: 'sine',
      },
    }).toDestination();
    synth.connect(dest);
    set({ monoSynth, synth });
  },
  setKeyboardVolume: keyboardVolume => {
    const monoSynth = get().monoSynth;
    const synth = get().synth;
    synth.volume.value = keyboardVolume - 5;
    monoSynth.volume.value = keyboardVolume - 5;
    set({ keyboardVolume: keyboardVolume });
  },
  ////////    init LoopPlayer, set DrumLoop and Volume    //////////
  initLoopPlayer: () => {
    const loopPlayer = new Tone.Player(
      `./audio/DrumLoops/${get().currentDrumLoop}.wav`
    ).toDestination();
    const dest = get().dest;
    loopPlayer.connect(dest);
    loopPlayer.loop = true;
    set({ loopPlayer });
  },
  setCurrentDrumLoop: currentDrumLoop => {
    set({ currentDrumLoop: currentDrumLoop });
  },
  setLoopPlayerVolume: loopPlayerVolume => {
    const loopPlayer = get().loopPlayer;
    loopPlayer.volume.value = loopPlayerVolume - 5;
    set({ loopPlayerVolume: loopPlayerVolume });
  },
  ////////////////    Sequencer    //////////////////////
  setAllPadsequences: allPadSequences => {
    set({ allPadSequences: allPadSequences });
  },
  setSelectedSequencerPad: selectedSequencerPad => {
    set({ selectedSequencerPad: selectedSequencerPad });
  },
  setCurrentTimeStamp: currentTimeStamp => {
    set({ currentTimeStamp: currentTimeStamp });
  },
  setSelectedPadSequence: selectedPadSequence => {
    set({ selectedPadSequence: selectedPadSequence });
  },
  setCurrentBpm: currentBpm => {
    Tone.Transport.bpm.value = currentBpm;
    set({ currentBpm: currentBpm });
  },
  //////////////////    save and add recordings    //////////////////////
  saveRecording: () => {
    const recorder = get().recorder;
    const chunks = [];
    if (recorder) {
      recorder.ondataavailable = event => chunks.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
        const audio = URL.createObjectURL(blob);
        get().addRecording({
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
  ///////////////     NavDirection DrumMachine      ///////////////
  setNavDirection: navDirection => {
    set({ navDirection: navDirection });
  },
  ///////////////     DJ Player      ///////////////
  initDJPlayerOne: () => {
    const faderPosition = get().faderPosition;
    const eqOneSettings = get().eqOneSettings;
    const eq3One = new Tone.EQ3(eqOneSettings).toDestination();
    const djPlayerOne = new Tone.Player(get().djTrackOne).connect(eq3One);
    if (faderPosition >= 0) {
      djPlayerOne.volume.value = -faderPosition;
    }
    set({ djPlayerOne, eq3One });
  },
  initDJPlayerTwo: () => {
    const faderPosition = get().faderPosition;
    const eqTwoSettings = get().eqOneSettings;
    const eq3Two = new Tone.EQ3(eqTwoSettings).toDestination();
    const djPlayerTwo = new Tone.Player(get().djTrackTwo).connect(eq3Two);
    if (faderPosition <= 0) {
      djPlayerTwo.volume.value = faderPosition;
    }
    set({ djPlayerTwo, eq3Two });
  },

  setDjTrackOne: newTrack => {
    set({ djTrackOne: newTrack });
    get().initDJPlayerOne();
  },
  setDjTrackTwo: newTrack => {
    set({ djTrackTwo: newTrack });
    get().initDJPlayerTwo();
  },
  setFaderPosition: newPosition => {
    const djPlayerOne = get().djPlayerOne;
    const djPlayerTwo = get().djPlayerTwo;
    if (newPosition === '40') {
      djPlayerOne.mute = true;
    } else if (newPosition >= 0) {
      djPlayerOne.volume.value = -newPosition / 2;
    }
    if (newPosition === '-40') {
      djPlayerTwo.mute = true;
    } else if (newPosition <= 0) {
      djPlayerTwo.volume.value = newPosition / 2;
    }
    set({ faderPosition: newPosition });
  },
}));

export default useStore;
