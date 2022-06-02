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
    isMIDIAssignButtonActive,
    filterPositionOne,
    filterPositionTwo,
    setFaderPosition,
    setNewMIDIControlFunction,
    setFilterPositionOne,
  } = useStore(state => state);

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
              position={filterPositionOne / 12.7 - 5}
              isMIDIAssignActive={isMIDIAssignButtonActive}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="filter-one"
              type="range"
              min="0"
              max="127"
              value={filterPositionOne}
              onChange={event => handleFilterPlayerOne(event.target.value)}
              onClick={() =>
                isMIDIAssignButtonActive
                  ? setNewMIDIControlFunction(handleFilterPlayerOne, 'range')
                  : null
              }
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
              position={filterPositionTwo / 12.7 - 5}
              isMIDIAssignActive={isMIDIAssignButtonActive}
              src={knobIcon}
              alt="control-knob"
              height="40px"
              width="40px"
            />
            <input
              id="filter-two"
              type="range"
              min="0"
              max="127"
              value={filterPositionTwo}
              onChange={event => handleFilterPlayerTwo(event.target.value)}
              onClick={() =>
                isMIDIAssignButtonActive
                  ? setNewMIDIControlFunction(handleFilterPlayerTwo, 'range')
                  : null
              }
            />
          </EQLabel>
        </EQ3>
      </EQContainer>
      <label htmlFor="dj-player-fader">
        <CrossFader
          isMIDIAssignActive={isMIDIAssignButtonActive}
          id="dj-player-fader"
          name="dj-player-fader"
          type="range"
          min="0"
          max="127"
          value={faderPosition}
          onChange={event => handleCrossFader(event.target.value)}
          onClick={() =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(handleCrossFader, 'range')
              : null
          }
        ></CrossFader>
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
  function handleCrossFader(value) {
    const { djPlayerOne, djPlayerTwo } = useStore.getState();
    const faderValue = Number(value);
    if (faderValue === 127) {
      djPlayerOne.volume.value = -500;
    } else if (faderValue >= 63) {
      const newValue = 117 - faderValue;
      djPlayerOne.volume.value = newValue / 6.5;
    }
    if (faderValue === 0) {
      djPlayerTwo.volume.value = -500;
    } else if (faderValue <= 63) {
      const newValue = faderValue - 10;
      djPlayerTwo.volume.value = newValue / 6.5;
    }
    setFaderPosition(faderValue);
  }

  function handleFilterPlayerOne(value) {
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
  }
  function handleFilterPlayerTwo(value) {
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
  }
}

const KnobIcon = styled.img`
  transform: rotate(${props => props.position * 26}deg);
  ${props => props.isMIDIAssignActive && 'background-color: var(--purple)'};
  border-radius: 10px;
`;
const Container = styled.div`
  text-align: center;
  border: 2px solid white;
  border-radius: 20px;
  min-width: 250px;
  p {
    margin: 0;
  }
`;
const EQContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const EQ3 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const CrossFader = styled.input`
  width: 150px;
  margin-bottom: 20px;
  ${props =>
    props.isMIDIAssignActive && 'box-shadow: inset 20px 20px var(--purple)'};
  border-radius: 10px;
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
