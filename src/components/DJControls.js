import { useState } from 'react';
import styled from 'styled-components';
import useStore from '../hooks/useStore';
import knobIcon from '../images/control-knob.svg';

export default function DJControls() {
  const {
    faderPosition,
    eq3One,
    eq3Two,
    djPlayerOne,
    lowpassFilterPlayerOne,
    highpassFilterPlayerOne,
    lowpassFilterPlayerTwo,
    highpassFilterPlayerTwo,
  } = useStore(state => state);
  const setFaderPosition = useStore(state => state.setFaderPosition);
  const [filterPositionOne, setFilterPositionOne] = useState(0);
  const [filterPositionTwo, setFilterPositionTwo] = useState(0);

  return (
    <Container>
      <EQContainer>
        <EQ3>
          <label htmlFor="high-frequency-one">
            <input
              id="high-frequency-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={e => eq3One.set({ high: e.target.value })}
            />
          </label>
          <label htmlFor="mid-frequency-one">
            <input
              id="mid-frequency-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={e => eq3One.set({ mid: e.target.value })}
            />
          </label>
          <label htmlFor="low-frequency-one">
            <input
              id="low-frequency-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={e => eq3One.set({ low: e.target.value })}
            />
          </label>
          <FilterLabel htmlFor="filter-one">
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
          </FilterLabel>
        </EQ3>
        <EQ3>
          <label htmlFor="high-frequency-two">
            <input
              id="high-frequency-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={e => eq3Two.set({ high: e.target.value })}
            />
          </label>
          <label htmlFor="mid-frequency-two">
            <input
              id="mid-frequency-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={e => eq3Two.set({ mid: e.target.value })}
            />
          </label>
          <label htmlFor="low-frequency-two">
            <input
              id="low-frequency-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="-5"
              onChange={e => eq3Two.set({ low: e.target.value })}
            />
          </label>
          <FilterLabel htmlFor="filter-two">
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
          </FilterLabel>
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

  function handlePlayerFader(e) {
    setFaderPosition(e.target.value);
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
`;
const EQContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const EQ3 = styled.div`
  display: flex;
  flex-direction: column;
`;
const LineFader = styled.input`
  width: 300px;
  margin-top: 20px;
`;
const FilterLabel = styled.label`
  position: relative;
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
