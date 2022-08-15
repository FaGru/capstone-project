import create from 'zustand';
import * as Tone from 'tone';
import { nanoid } from 'nanoid';
import { defaultPadSettings } from '../data';
import { defaultSequencerSettings } from '../data';
import WaveSurfer from 'wavesurfer.js';

const useStore = create((set, get) => ({
  tone: null,
  dest: null,
  recorder: null,
  monoSynth: null,
  synth: null,
  recordings: [],
  allPads: defaultPadSettings,
  keyboardVolume: 5,
  mousePosition: { x: 0, y: 0 },
  currentPage: null,
  isBurgerMenuVisible: false,
  visibleSettings: 'DrumPads',
  ///////// Drumloop-Player States //////
  loopPlayer: null,
  loopPlayerVolume: 5,
  drumPadPlayersVolume: 5,
  currentDrumLoop: 'DrumLoop90BPM',
  /////////   Sequencer States //////////////
  currentTimeStamp: 0,
  currentSequencerVolume: 0,
  currentSequencerBpm: 100,
  allPadSequences: defaultSequencerSettings,
  selectedSequencerPad: 0,
  selectedPadSequence: defaultSequencerSettings[0].settings,
  //////// Instructions States /////////////////
  isInstructionOneVisible: false,
  isInstructionTwoVisible: false,
  isInstructionThreeVisible: false,
  isInstructionFourVisible: false,
  isInstructionFiveVisible: false,
  //////// MIDI Device States //////////
  isDevicePopUpVisible: false,
  connectedMIDIDevices: null,
  assignedMIDIControls: [],
  assignedMIDIControlMessage: null,
  isMIDIAssignButtonActive: false,
  newMIDIControlName: null,
  newMIDIControlCommand: null,
  newMIDIControlFunction: null,
  newMIDIControlType: null,
  newMIDIControlAdditionalProp: null,
  ///////// DJ Deck States ////////////
  djPlayerOne: null,
  djPlayerTwo: null,
  currentEQName: null,
  currentEQValue: null,
  currentDJControl: null,
  eqOneSettings: { high: -5, mid: -5, low: -5 },
  eqTwoSettings: { high: -5, mid: -5, low: -5 },
  lowpassFilterPlayerOne: null,
  highpassFilterPlayerOne: null,
  lowpassFilterPlayerTwo: null,
  highpassFilterPlayerTwo: null,
  djTrackOne: 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
  djTrackTwo: 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
  djPlayerOnePlaybackRate: 63.5,
  djPlayerTwoPlaybackRate: 63.5,
  eq3One: null,
  eq3Two: null,
  feedbackDelay: null,
  faderPosition: 63.5,
  isEchoOutOneActive: false,
  isEchoOutTwoActive: false,
  filterPositionOne: 63.5,
  filterPositionTwo: 63.5,
  volumeFaderOnePosition: 127,
  volumeFaderTwoPosition: 127,
  render: false,
  wavesurferOne: null,
  wavesurferTwo: null,
  loginRegister: 'login',

  setMousePosition: (positionX, positionY) => {
    set({ mousePosition: { x: positionX, y: positionY } });
  },
  setCurrentPage: newPage => {
    set({ currentPage: newPage });
  },
  setIsBurgerMenuVisible: () => {
    const isBurgerMenuVisible = get().isBurgerMenuVisible;
    set({ isBurgerMenuVisible: !isBurgerMenuVisible });
  },
  setVisibleSettings: newVisibleSettings => {
    set({ visibleSettings: newVisibleSettings });
  },
  setLoginRegister: newValue => {
    set({ loginRegister: newValue });
  },

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
        get().initFeedbackDelay();
        get().initMIDIDevices();
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
  setcurrentSequencerBpm: currentSequencerBpm => {
    Tone.Transport.bpm.value = currentSequencerBpm;
    set({ currentSequencerBpm: currentSequencerBpm });
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
  ///////////////     DJ Player      ///////////////
  initDJPlayerOne: () => {
    const { eqOneSettings, volumeFaderOnePosition } = get();
    const faderPosition = get().faderPosition - 63.5;

    const highpassFilterPlayerOne = new Tone.Filter({
      frequency: 0,
      type: 'highpass',
    }).toDestination();
    const lowpassFilterPlayerOne = new Tone.Filter({
      frequency: 22000,
      type: 'lowpass',
    }).connect(highpassFilterPlayerOne);
    const eq3One = new Tone.EQ3(eqOneSettings).connect(lowpassFilterPlayerOne);
    const djPlayerOne = new Tone.Player(get().djTrackOne).connect(eq3One);

    djPlayerOne.playbackRate = get().djPlayerOnePlaybackRate / 317.5 + 0.8;

    if (faderPosition === 63.5 || volumeFaderOnePosition === 0) {
      djPlayerOne.mute = true;
    } else if (volumeFaderOnePosition !== 0) {
      djPlayerOne.mute = false;
      if (faderPosition >= 0) {
        const conversionNumber = (1 / 63.5) * -faderPosition + 1;
        djPlayerOne.volume.value =
          (20 / 127) * volumeFaderOnePosition * conversionNumber - 20;
      }
    }
    set({
      djPlayerOne,
      eq3One,
      lowpassFilterPlayerOne,
      highpassFilterPlayerOne,
    });
  },
  initDJPlayerTwo: () => {
    const { eqTwoSettings, volumeFaderTwoPosition } = get();
    const faderPosition = get().faderPosition - 63.5;
    const highpassFilterPlayerTwo = new Tone.Filter({
      frequency: 0,
      type: 'highpass',
    }).toDestination();
    const lowpassFilterPlayerTwo = new Tone.Filter({
      frequency: 22000,
      type: 'lowpass',
    }).connect(highpassFilterPlayerTwo);
    const eq3Two = new Tone.EQ3(eqTwoSettings).connect(lowpassFilterPlayerTwo);
    const djPlayerTwo = new Tone.Player(get().djTrackTwo).connect(eq3Two);

    djPlayerTwo.playbackRate = get().djPlayerTwoPlaybackRate / 317.5 + 0.8;

    if (faderPosition === -63.5) {
      djPlayerTwo.mute = true;
    } else if (volumeFaderTwoPosition !== 0 || volumeFaderTwoPosition === 0) {
      if (faderPosition <= 0) {
        const conversionNumber = (1 / 63.5) * faderPosition + 1;
        djPlayerTwo.volume.value =
          (20 / 127) * volumeFaderTwoPosition * conversionNumber - 20;
      }
    }
    set({
      djPlayerTwo,
      eq3Two,
      lowpassFilterPlayerTwo,
      highpassFilterPlayerTwo,
    });
  },
  initWaveSurferOne: () => {
    const djPlayerOne = get().djPlayerOne;

    if (get().wavesurferOne) {
      get().wavesurferOne.destroy();
    }
    const newWavesurfer = WaveSurfer.create({
      container: '#waveformOne',
      waveColor: 'white',
      progressColor: 'gray',
      height: '32',
      width: '200px',
      barWidth: 1,
    });
    newWavesurfer.load(get().djTrackOne);
    newWavesurfer.setMute(true);
    newWavesurfer.on('seek', function () {
      const currentTime = newWavesurfer.getCurrentTime();
      djPlayerOne.seek(currentTime);
    });
    set({ wavesurferOne: newWavesurfer });
  },

  initWaveSurferTwo: () => {
    const djPlayerTwo = get().djPlayerTwo;

    if (get().wavesurferTwo) {
      get().wavesurferTwo.destroy();
    }
    const newWavesurfer = WaveSurfer.create({
      container: '#waveformTwo',
      waveColor: 'white',
      progressColor: 'gray',
      height: '32',
      width: '200px',
      barWidth: 1,
    });
    newWavesurfer.load(get().djTrackTwo);
    newWavesurfer.setMute(true);
    newWavesurfer.on('seek', function () {
      const currentTime = newWavesurfer.getCurrentTime();
      djPlayerTwo.seek(currentTime);
      newWavesurfer.setPlayEnd(currentTime);
    });
    set({ wavesurferTwo: newWavesurfer });
  },

  setCurrentEQName: newName => {
    set({ currentEQName: newName });
  },
  setCurrentEQValue: newValue => {
    set({ currentEQValue: newValue });
  },
  setCurrentDJControl: newDJControl => {
    set({ currentDJControl: newDJControl });
  },
  initFeedbackDelay: () => {
    const feedbackDelay = new Tone.FeedbackDelay('4n', 0.5).toDestination();
    set({ feedbackDelay });
  },
  setFaderPosition: newFaderPosition => {
    set({ faderPosition: newFaderPosition });
  },
  setVolumeFaderOnePosition: newPosition => {
    set({ volumeFaderOnePosition: newPosition });
  },
  setVolumeFaderTwoPosition: newPosition => {
    set({ volumeFaderTwoPosition: newPosition });
  },
  setDjPlayerOnePlaybackRate: newRate => {
    set({ djPlayerOnePlaybackRate: newRate });
  },
  setDjPlayerTwoPlaybackRate: newRate => {
    set({ djPlayerTwoPlaybackRate: newRate });
  },
  setDjTrackOne: newTrack => {
    set({ djTrackOne: newTrack });
    get().initDJPlayerOne();
  },
  setDjTrackTwo: newTrack => {
    set({ djTrackTwo: newTrack });
    get().initDJPlayerTwo();
  },
  setIsEchoOutOneActive: () => {
    const isEchoOutOneActive = get().isEchoOutOneActive;
    set({ isEchoOutOneActive: !isEchoOutOneActive });
  },
  setIsEchoOutTwoActive: () => {
    const isEchoOutTwoActive = get().isEchoOutTwoActive;
    set({ isEchoOutTwoActive: !isEchoOutTwoActive });
  },
  setFilterPositionOne: value => {
    set({ filterPositionOne: value });
  },
  setFilterPositionTwo: value => {
    set({ filterPositionTwo: value });
  },
  /////////////////////////////////////////////////////////////
  initMIDIDevices: () => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(success, failure);
    }

    function success(midiAccess) {
      const inputs = midiAccess.inputs;
      midiAccess.addEventListener('statechange', updateDevices);
      inputs.forEach(input => {
        input.addEventListener('midimessage', handleInput);
      });
    }
    function handleInput(event) {
      const assignedMIDIControls = get().assignedMIDIControls;
      const isMIDIAssignButtonActive = get().isMIDIAssignButtonActive;
      const command = event.data[0];
      const midiButton = event.data[1];
      const value = event.data[2];
      console.log(assignedMIDIControls);
      //////// Assigning midi function /////////////////
      if (isMIDIAssignButtonActive) {
        const newMIDIControlFunction = get().newMIDIControlFunction;
        if (newMIDIControlFunction) {
          set({
            newMIDIControlName: event.data[1],
            newMIDIControlCommand: event.data[0],
          });
          get().addMIDIControl();
        }
      }
      //////////// function call ////////////
      else {
        assignedMIDIControls.forEach(control => {
          if (
            control.name === midiButton &&
            control.command === command &&
            control.type === 'normal'
          ) {
            value > 0 && control.function(control.additionalProp);
          } else if (
            control.name === midiButton &&
            control.command === command &&
            control.type === 'tap'
          ) {
            control.function();
          } else if (
            control.name === midiButton &&
            control.command === command &&
            control.type === 'range'
          ) {
            // control.function(value, control.additionalProp);
            // if (control.function === 'filterPlayerTwo') {
            //   get().handleFilterPlayerTwo(value);
            // }
            switch (control.function) {
              case 'filterPlayerTwo':
                get().handleFilterPlayerTwo(value);
                break;
              case 'filterPlayerOne':
                get().handleFilterPlayerOne(value);
                break;
              case 'crossFader':
                get().handleCrossFader(value);
                break;
              case 'lineFader':
                get().handleLineFader(value, control.additionalProp);
                break;
              case 'eqSetting':
                get().handleEQSetting(value, control.additionalProp);
                break;
              default:
            }
          }
        });
      }
    }

    function updateDevices(event) {
      console.log(event, 'devices');
      set({
        connectedMIDIDevices: `Name: ${event.port.name} Brand: ${event.port.manufacturer} State: ${event.port.state}`,
      });
      set({ isDevicePopUpVisible: true });
      setTimeout(function () {
        set({ isDevicePopUpVisible: false });
      }, 5000);
    }
    function failure() {
      console.log('could not connect devices');
    }
    ///////////////////////////////////////////////////////////////////////////////////////
  },
  setNewMIDIControlFunction: (functionName, functionTyp, additionalProp) => {
    set({
      newMIDIControlFunction: functionName,
      newMIDIControlType: functionTyp,
      newMIDIControlAdditionalProp: additionalProp,
      assignedMIDIControlMessage: 'Now choose a control on your MIDI-Controler',
    });
  },
  addMIDIControl: () => {
    const assignedMIDIControls = get().assignedMIDIControls;
    const newMIDIControlFunction = get().newMIDIControlFunction;
    const newMIDIControlName = get().newMIDIControlName;
    const newMIDIControlAdditionalProp = get().newMIDIControlAdditionalProp;
    const newMIDIControlType = get().newMIDIControlType;
    const newMIDIControlCommand = get().newMIDIControlCommand;
    const newMIDIControls = assignedMIDIControls.filter(
      control =>
        // control.function !== newMIDIControlFunction &&
        control.name !== newMIDIControlName ||
        control.command !== newMIDIControlCommand
    );

    set({
      assignedMIDIControls: [
        ...newMIDIControls,
        {
          name: newMIDIControlName,
          command: newMIDIControlCommand,
          function: newMIDIControlFunction,
          type: newMIDIControlType,
          additionalProp: newMIDIControlAdditionalProp,
        },
      ],
    });
    set({
      newMIDIControlFunction: null,
      newMIDIControlName: null,
      newMIDIControlType: null,
      newMIDIControlCommand: null,
      assignedMIDIControlMessage:
        'Your MIDI-Control is linked now. Click on a purple Element to assign more controls or leave the assigning mode!',
    });
  },
  setIsMIDIAssignButtonActive: () => {
    const isMIDIAssignButtonActive = get().isMIDIAssignButtonActive;
    if (!isMIDIAssignButtonActive) {
      set({
        assignedMIDIControlMessage:
          'Please click on a purple marked Element to assign control (works only on Chrome)',
      });
    } else {
      set({
        assignedMIDIControlMessage: null,
        newMIDIControlFunction: null,
        newMIDIControlName: null,
        newMIDIControlType: null,
        newMIDIControlCommand: null,
      });
    }
    set({ isMIDIAssignButtonActive: !isMIDIAssignButtonActive });
  },
  setRender: () => {
    const render = get().render;
    set({ render: !render });
  },
  setAssignedMIDIControls: backendMidiData => {
    set({ assignedMIDIControls: backendMidiData });
  },

  ///////////// midi integrated functions ////////////////////

  handleFilterPlayerTwo: value => {
    const {
      lowpassFilterPlayerTwo,
      highpassFilterPlayerTwo,
      setFilterPositionTwo,
    } = useStore.getState();
    const newValue = value / 12.7 - 5;
    setFilterPositionTwo(value);
    newValue < 0
      ? lowpassFilterPlayerTwo.set({
          frequency: 5000 / Math.pow(2, -newValue),
        })
      : lowpassFilterPlayerTwo.set({
          frequency: 22000,
        });
    newValue > 0
      ? highpassFilterPlayerTwo.set({
          frequency: 100 * Math.pow(2, newValue),
        })
      : highpassFilterPlayerTwo.set({
          frequency: 0,
        });
  },
  handleFilterPlayerOne: value => {
    const {
      lowpassFilterPlayerOne,
      highpassFilterPlayerOne,
      setFilterPositionOne,
    } = useStore.getState();
    const newValue = value / 12.7 - 5;
    setFilterPositionOne(value);
    newValue < 0
      ? lowpassFilterPlayerOne.set({
          frequency: 5000 / Math.pow(2, -newValue),
        })
      : lowpassFilterPlayerOne.set({
          frequency: 22000,
        });
    newValue > 0
      ? highpassFilterPlayerOne.set({
          frequency: 100 * Math.pow(2, newValue),
        })
      : highpassFilterPlayerOne.set({
          frequency: 0,
        });
  },
  handleCrossFader: value => {
    const {
      djPlayerOne,
      djPlayerTwo,
      volumeFaderOnePosition,
      volumeFaderTwoPosition,
    } = useStore.getState();
    const faderValue = Number(value) - 63.5;

    if (faderValue === 63.5) {
      djPlayerOne.mute = true;
    } else if (volumeFaderOnePosition !== 0) {
      djPlayerOne.mute = false;
      if (faderValue >= 0) {
        const conversionNumber = (1 / 63.5) * -faderValue + 1;
        djPlayerOne.volume.value =
          (20 / 127) * volumeFaderOnePosition * conversionNumber - 20;
      }
    }
    if (faderValue === -63.5) {
      djPlayerTwo.mute = true;
    } else if (volumeFaderTwoPosition !== 0) {
      if (faderValue <= 0) {
        const conversionNumber = (1 / 63.5) * faderValue + 1;
        djPlayerTwo.volume.value =
          (20 / 127) * volumeFaderTwoPosition * conversionNumber - 20;
      }
    }
    get().setFaderPosition(Number(value));
  },
  handleLineFader: (value, name) => {
    const {
      djPlayerOne,
      djPlayerTwo,
      faderPosition,
      setVolumeFaderOnePosition,
      setVolumeFaderTwoPosition,
    } = useStore.getState();
    const volumeFaderValue = Number(value);
    const crossFaderValue = faderPosition - 63.5;
    if (name === 'volume fader one') {
      if (volumeFaderValue === 0) {
        djPlayerOne.mute = true;
      } else if (faderPosition !== 127) {
        djPlayerOne.mute = false;
        if (crossFaderValue >= 0) {
          const conversionNumber = (1 / 63.5) * -crossFaderValue + 1;
          djPlayerOne.volume.value =
            (20 / 127) * volumeFaderValue * conversionNumber - 20;
        } else {
          djPlayerOne.volume.value = (20 / 127) * volumeFaderValue - 20;
        }
      }
      setVolumeFaderOnePosition(Number(volumeFaderValue));
    }

    if (name === 'volume fader two') {
      if (volumeFaderValue === 0) {
        djPlayerTwo.mute = true;
      } else if (faderPosition !== 0) {
        djPlayerTwo.mute = false;
        if (crossFaderValue <= 0) {
          const conversionNumber = (1 / 63.5) * crossFaderValue + 1;
          djPlayerTwo.volume.value =
            (20 / 127) * volumeFaderValue * conversionNumber - 20;
        } else {
          djPlayerTwo.volume.value = (20 / 127) * volumeFaderValue - 20;
        }
      }
      setVolumeFaderTwoPosition(Number(volumeFaderValue));
    }
  },

  handleEQSetting: (value, name) => {
    const { setRender, eq3One, eq3Two } = useStore.getState();
    const newValue = value / 6.35 - 15;
    if (name === 'high-one') {
      eq3One.set({ high: newValue });
    } else if (name === 'mid-one') {
      eq3One.set({ mid: newValue });
    } else if (name === 'low-one') {
      eq3One.set({ low: newValue });
    } else if (name === 'high-two') {
      eq3Two.set({ high: newValue });
    } else if (name === 'mid-two') {
      eq3Two.set({ mid: newValue });
    } else if (name === 'low-two') {
      eq3Two.set({ low: newValue });
    }
    setRender();
  },
}));

export default useStore;
