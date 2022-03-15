import KeyboardButtons from '../components/KeyboardButtons';
import * as Tone from 'tone';

export default function KeyboardboardPage() {
  const synth = new Tone.Synth({
    volume: -2,
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

  const mono = new Tone.MonoSynth({
    volume: -3,
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



  return (
    <>
      <KeyboardButtons keyboardClick={keyboardClick} />
    </>
  );
  function keyboardClick(event) {
    const currentButton = event.target.value;
    mono.triggerAttackRelease(currentButton, '8n');
    synth.triggerAttackRelease(currentButton, '8n');
  }
}
