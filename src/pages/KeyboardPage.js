import KeyboardButtons from '../components/KeyboardButtons';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import * as Tone from 'tone';

export default function KeyboardboardPage() {
  const [keyboardVolume, setKeyboardVolume] = useState(5);

  const synth = useMemo(
    () =>
      new Tone.Synth({
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
      }).toDestination(),
    [keyboardVolume]
  );

  const mono = useMemo(
    () =>
      new Tone.MonoSynth({
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
            1.2732395447351628, 0, 0.4244131815783876, 0, 0.25464790894703254,
            0, 0.18189136353359467, 0,
          ],
          phase: 0,
          type: 'square8',
        },
      }).toDestination(),
    [keyboardVolume]
  );

  return (
    <KeyboardContainer>
      <label htmlFor="keyboard-volume">Volume: {keyboardVolume}</label>
      <VolumeRange
        name="keyboard-volume"
        id="keyboard-volume"
        type="range"
        min="0"
        max="100"
        value={keyboardVolume * 10}
        onChange={handleKeyboardVolume}
      ></VolumeRange>
      <KeyboardButtons keyboardClick={keyboardClick} />
    </KeyboardContainer>
  );
  function keyboardClick(event) {
    const currentButton = event.target.value;
    mono.triggerAttackRelease(currentButton, '8n');
    synth.triggerAttackRelease(currentButton, '8n');
  }
  function handleKeyboardVolume(e) {
    setKeyboardVolume(e.target.value / 10);
  }
}
const KeyboardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--darkgray);
  border: 2px solid var(--lightgray);
  padding: 20px;
  margin: 20px;
  @media (orientation: portrait) {
    display: none;
  }

`;
const VolumeRange = styled.input`
  width: 30%;
  margin-bottom: 20px;
`
