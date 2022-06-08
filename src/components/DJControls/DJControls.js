import styled from 'styled-components';
import useStore from '../../hooks/useStore';
import knobIcon from '../../images/control-knob.svg';

export default function DJControls() {
  const {
    faderPosition,
    eq3One,
    eq3Two,
    isMIDIAssignButtonActive,
    filterPositionOne,
    filterPositionTwo,
    volumeFaderOnePosition,
    volumeFaderTwoPosition,
    setFaderPosition,
    setNewMIDIControlFunction,
  } = useStore(state => state);

  return (
    <Container>
      <VolumeOneLabel htmlFor="volume fader one">
        <VolumeInputOne
          isMIDIAssignActive={isMIDIAssignButtonActive}
          type="range"
          min="0"
          max="127"
          value={volumeFaderOnePosition}
          id="volume fader one"
          name="volume fader one"
          onChange={event =>
            handleVolume(event.target.value, event.target.name)
          }
          onClick={event =>
            isMIDIAssignButtonActive &&
            setNewMIDIControlFunction(handleVolume, 'range', event.target.name)
          }
        />
      </VolumeOneLabel>
      <VolumeTwoLabel htmlFor="volume fader two">
        <VolumeInputTwo
          isMIDIAssignActive={isMIDIAssignButtonActive}
          type="range"
          min="0"
          max="127"
          value={volumeFaderTwoPosition}
          id="volume fader two"
          name="volume fader two"
          onChange={event =>
            handleVolume(event.target.value, event.target.name)
          }
          onClick={event =>
            isMIDIAssignButtonActive &&
            setNewMIDIControlFunction(handleVolume, 'range', event.target.name)
          }
        />
      </VolumeTwoLabel>
      <EQContainer>
        <EQ3>
          <p>HIGH</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={(eq3One?.high.value + 5) / 2}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="high-one"
            onTouchStart={event => handleMouseDown(event, eq3One.high.value)}
            onMouseDown={event => handleMouseDown(event, eq3One.high.value)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleEQSetting,
                'range',
                event.target.name
              )
            }
            onDoubleClick={event => handleEQSetting(63.5, event.target.name)}
          />
          <p>MID</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={(eq3One?.mid.value + 5) / 2}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="mid-one"
            onTouchStart={event => handleMouseDown(event, eq3One.mid.value)}
            onMouseDown={event => handleMouseDown(event, eq3One.mid.value)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleEQSetting,
                'range',
                event.target.name
              )
            }
            onDoubleClick={event => handleEQSetting(63.5, event.target.name)}
          />
          <p>LOW</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={(eq3One?.low.value + 5) / 2}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="low-one"
            onTouchStart={event => handleMouseDown(event, eq3One.low.value)}
            onMouseDown={event => handleMouseDown(event, eq3One.low.value)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleEQSetting,
                'range',
                event.target.name
              )
            }
            onDoubleClick={event => handleEQSetting(63.5, event.target.name)}
          />
          <p>FILTER</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={filterPositionOne / 12.7 - 5}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="filter-one"
            onTouchStart={event => handleMouseDown(event, filterPositionOne)}
            onMouseDown={event => handleMouseDown(event, filterPositionOne)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleFilterPlayerOne,
                'range',
                event.target.name
              )
            }
            onDoubleClick={() => handleFilterPlayerOne(63.5)}
          />
        </EQ3>
        <EQ3>
          <p>HIGH</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={(eq3Two?.high.value + 5) / 2}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="high-two"
            onTouchStart={event => handleMouseDown(event, eq3Two.high.value)}
            onMouseDown={event => handleMouseDown(event, eq3Two.high.value)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleEQSetting,
                'range',
                event.target.name
              )
            }
            onDoubleClick={event => handleEQSetting(63.5, event.target.name)}
          />
          <p>MID</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={(eq3Two?.mid.value + 5) / 2}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="mid-two"
            onTouchStart={event => handleMouseDown(event, eq3Two.mid.value)}
            onMouseDown={event => handleMouseDown(event, eq3Two.mid.value)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleEQSetting,
                'range',
                event.target.name
              )
            }
            onDoubleClick={event => handleEQSetting(63.5, event.target.name)}
          />
          <p>LOW</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={(eq3Two?.low.value + 5) / 2}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="low-two"
            onTouchStart={event => handleMouseDown(event, eq3Two.low.value)}
            onMouseDown={event => handleMouseDown(event, eq3Two.low.value)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleEQSetting,
                'range',
                event.target.name
              )
            }
            onDoubleClick={event => handleEQSetting(63.5, event.target.name)}
          />
          <p>FILTER</p>
          <KnobIcon
            draggable={false}
            isMIDIAssignActive={isMIDIAssignButtonActive}
            position={filterPositionTwo / 12.7 - 5}
            src={knobIcon}
            alt="control-knob"
            height="40px"
            width="40px"
            name="filter-two"
            onTouchStart={event => handleMouseDown(event, filterPositionTwo)}
            onMouseDown={event => handleMouseDown(event, filterPositionTwo)}
            onClick={event =>
              isMIDIAssignButtonActive &&
              setNewMIDIControlFunction(
                handleFilterPlayerTwo,
                'range',
                event.target.name
              )
            }
            onDoubleClick={() => handleFilterPlayerTwo(63.5)}
          />
        </EQ3>
      </EQContainer>
      <CrossFaderLabel htmlFor="dj-player-fader">
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
            isMIDIAssignButtonActive &&
            setNewMIDIControlFunction(handleCrossFader, 'range')
          }
        ></CrossFader>
      </CrossFaderLabel>
    </Container>
  );
  function handleVolume(value, name) {
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
        console.log('asdf');
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
  }

  function handleMouseDown(event, eqValue) {
    const { setMousePosition, setCurrentEQName, setCurrentEQValue } =
      useStore.getState();
    setMousePosition({ x: event.pageX, y: event.pageY });
    setCurrentEQName(event.target.name);
    if (event.target.name.includes('filter')) {
      setCurrentEQValue(eqValue);
    } else {
      setCurrentEQValue((eqValue + 15) * 6.35);
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
  }

  function handleTouchMove(e) {
    const {
      mousePosition,
      currentEQName,
      currentEQValue,
      setMousePosition,
      setCurrentEQValue,
    } = useStore.getState();
    if (mousePosition.x < e.touches[0].pageX && currentEQValue < 127) {
      setCurrentEQValue(currentEQValue + 3);
      if (currentEQName === 'filter-one') {
        handleFilterPlayerOne(currentEQValue + 3);
      } else if (currentEQName === 'filter-two') {
        handleFilterPlayerTwo(currentEQValue + 3);
      } else {
        handleEQSetting(currentEQValue + 3, currentEQName);
      }
    } else if (mousePosition.x > e.touches[0].pageX && currentEQValue > 0) {
      setCurrentEQValue(currentEQValue - 3);
      if (currentEQName === 'filter-one') {
        handleFilterPlayerOne(currentEQValue - 3);
      } else if (currentEQName === 'filter-two') {
        handleFilterPlayerTwo(currentEQValue - 3);
      } else {
        handleEQSetting(currentEQValue - 3, currentEQName);
      }
    }
    setMousePosition(e.touches[0].pageX, e.touches[0].pageY);
  }

  function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchend', handleMouseUp);
  }

  function handleMouseMove(e) {
    const {
      mousePosition,
      currentEQName,
      currentEQValue,
      setMousePosition,
      setCurrentEQValue,
    } = useStore.getState();
    if (mousePosition.x < e.pageX && currentEQValue < 127) {
      setCurrentEQValue(currentEQValue + 3);
      if (currentEQName === 'filter-one') {
        handleFilterPlayerOne(currentEQValue + 3);
      } else if (currentEQName === 'filter-two') {
        handleFilterPlayerTwo(currentEQValue + 3);
      } else {
        handleEQSetting(currentEQValue + 3, currentEQName);
      }
    } else if (mousePosition.x > e.pageX && currentEQValue > 0) {
      setCurrentEQValue(currentEQValue - 3);
      if (currentEQName === 'filter-one') {
        handleFilterPlayerOne(currentEQValue - 3);
      } else if (currentEQName === 'filter-two') {
        handleFilterPlayerTwo(currentEQValue - 3);
      } else {
        handleEQSetting(currentEQValue - 3, currentEQName);
      }
    }
    setMousePosition(e.pageX, e.pageY);
  }

  function handleEQSetting(value, name) {
    const { setRender } = useStore.getState();
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
  }

  function handleCrossFader(value) {
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
    setFaderPosition(Number(value));
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

const Container = styled.main`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr auto;
  text-align: center;
  border: 2px solid white;
  border-radius: 20px;
  min-width: 250px;
  background-color: var(--darkgray);
  p {
    margin: 0;
  }
`;
const EQContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const EQ3 = styled.section`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const KnobIcon = styled.img`
  transform: rotate(${props => props.position * 26}deg);
  ${props => props.isMIDIAssignActive && 'background-color: var(--purple)'};
  border-radius: 10px;
  margin: 5px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;
const CrossFaderLabel = styled.label`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;
const CrossFader = styled.input`
  width: 150px;
  margin-bottom: 20px;
  box-shadow: inset 20px 20px var(--white);
  ${props =>
    props.isMIDIAssignActive && 'box-shadow: inset 20px 20px var(--purple)'};
  border-radius: 10px;
`;
const VolumeOneLabel = styled.label`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  position: relative;
  width: 20px;
  justify-self: center;
`;
const VolumeTwoLabel = styled.label`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  position: relative;
  width: 20px;
  justify-self: center;
`;
const VolumeInputOne = styled.input`
  position: absolute;
  left: -40px;
  top: 210px;
  transform: rotate(-90deg);
  border-radius: 5px;
  height: 25px;
  box-shadow: inset 50px 50px var(--white);
  ${props =>
    props.isMIDIAssignActive && 'box-shadow: inset 50px 50px var(--purple)'};
`;
const VolumeInputTwo = styled(VolumeInputOne)`
  left: -70px;
`;
