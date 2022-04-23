import { useState } from 'react';
import styled from 'styled-components';
import useStore from '../../hooks/useStore';
import knobIcon from '../../images/control-knob.svg';

export default function DJControls() {
  const {
    faderPosition,
    eq3One,
    eq3Two,
    lowpassFilterPlayerOne,
    highpassFilterPlayerOne,
    lowpassFilterPlayerTwo,
    highpassFilterPlayerTwo,
    djPlayerOne,
    djPlayerTwo,
  } = useStore(state => state);

  const [filterPositionOne, setFilterPositionOne] = useState(0);
  const [filterPositionTwo, setFilterPositionTwo] = useState(0);
  const [render, setRender] = useState(false);

  return (
    <Container>
      <EQContainer>
        <EQ3>
          <p>HIGH</p>
          <EQLabel htmlFor="high-frequency-one">
            <KnobIcon
              position={(eq3One?.high.value + 5) / 2}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="high-frequency-one"
              name="high-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={handleEQSetting}
            />
          </EQLabel>
          <p>MID</p>
          <EQLabel htmlFor="mid-frequency-one">
            <KnobIcon
              position={(eq3One?.mid.value + 5) / 2}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="mid-frequency-one"
              name="mid-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={handleEQSetting}
            />
          </EQLabel>
          <p>LOW</p>
          <EQLabel htmlFor="low-frequency-one">
            <KnobIcon
              position={(eq3One?.low.value + 5) / 2}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="low-frequency-one"
              name="low-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={handleEQSetting}
            />
          </EQLabel>
          <p>FILTER</p>
          <EQLabel htmlFor="filter-one">
            <KnobIcon
              position={filterPositionOne}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="filter-one"
              type="range"
              min="-5"
              max="5"
              defaultValue="0"
              onChange={handleFilterPlayerOne}
            />
          </EQLabel>
        </EQ3>
        <EQ3>
          <p>HIGH</p>
          <EQLabel htmlFor="high-frequency-two">
            <KnobIcon
              position={(eq3Two?.high.value + 5) / 2}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="high-frequency-two"
              name="high-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={handleEQSetting}
            />
          </EQLabel>
          <p>MID</p>
          <EQLabel htmlFor="mid-frequency-two">
            <KnobIcon
              position={(eq3Two?.mid.value + 5) / 2}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="mid-frequency-two"
              name="mid-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={handleEQSetting}
            />
          </EQLabel>
          <p>LOW</p>
          <EQLabel htmlFor="low-frequency-two">
            <KnobIcon
              position={(eq3Two?.low.value + 5) / 2}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="low-frequency-two"
              name="low-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={handleEQSetting}
            />
          </EQLabel>
          <p>FILTER</p>
          <EQLabel htmlFor="filter-two">
            <KnobIcon
              position={filterPositionTwo}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="filter-two"
              type="range"
              min="-5"
              max="5"
              defaultValue="0"
              onChange={handleFilterPlayerTwo}
            />
          </EQLabel>
        </EQ3>
      </EQContainer>
      <label htmlFor="dj-player-fader">
        <LineFader
          id="dj-player-fader"
          name="dj-player-fader"
          type="range"
          min="-40"
          max="40"
          defaultValue={faderPosition}
          onChange={handlePlayerFader}
        ></LineFader>
      </label>
    </Container>
  );

  function handleEQSetting(e) {
    if (e.target.name === 'high-one') {
      eq3One.set({ high: e.target.value });
    } else if (e.target.name === 'mid-one') {
      eq3One.set({ mid: e.target.value });
    } else if (e.target.name === 'low-one') {
      eq3One.set({ low: e.target.value });
    } else if (e.target.name === 'high-two') {
      eq3Two.set({ high: e.target.value });
    } else if (e.target.name === 'mid-two') {
      eq3Two.set({ mid: e.target.value });
    } else {
      eq3Two.set({ low: e.target.value });
    }
    setRender(!render);
  }
  function handlePlayerFader(e) {
    if (e.target.value === '40') {
      djPlayerOne.mute = true;
    } else if (e.target.value >= 0) {
      djPlayerOne.volume.value = -e.target.value / 2;
    }
    if (e.target.value === '-40') {
      djPlayerTwo.mute = true;
    } else if (e.target.value <= 0) {
      djPlayerTwo.volume.value = e.target.value / 2;
    }
  }
  function handleFilterPlayerOne(e) {
    setFilterPositionOne(e.target.value);
    e.target.value < 0
      ? lowpassFilterPlayerOne.set({
          frequency: 5000 / Math.pow(2, -e.target.value),
        })
      : lowpassFilterPlayerOne.set({
          frequency: 22000,
        });
    e.target.value > 0
      ? highpassFilterPlayerOne.set({
          frequency: 100 * Math.pow(2, e.target.value),
        })
      : highpassFilterPlayerOne.set({
          frequency: 0,
        });
  }
  function handleFilterPlayerTwo(e) {
    setFilterPositionTwo(e.target.value);
    e.target.value < 0
      ? lowpassFilterPlayerTwo.set({
          frequency: 5000 / Math.pow(2, -e.target.value),
        })
      : lowpassFilterPlayerTwo.set({
          frequency: 22000,
        });
    e.target.value > 0
      ? highpassFilterPlayerTwo.set({
          frequency: 100 * Math.pow(2, e.target.value),
        })
      : highpassFilterPlayerTwo.set({
          frequency: 0,
        });
  }
}

const KnobIcon = styled.img`
  transform: rotate(${props => props.position * 26}deg);
`;
const Container = styled.div`
  text-align: center;
  border: 2px solid white;
  p {
    margin: 0;
  }
`;
const EQContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const EQ3 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const LineFader = styled.input`
  width: 200px;
  margin: 20px;
`;
const EQLabel = styled.label`
  position: relative;
  margin: 5px;
  input {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    width: 50px;
    opacity: 0;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
`;
