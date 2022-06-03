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
    setFaderPosition,
    setNewMIDIControlFunction,
  } = useStore(state => state);

  // const [render, setRender] = useState(false);

  return (
    <Container>
      <EQContainer>
        <EQ3>
          <p>HIGH</p>
          <EQLabel htmlFor="high-frequency-one">
            <KnobIcon
              isMIDIAssignActive={isMIDIAssignButtonActive}
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
              min="0"
              max="127"
              value={eq3One ? eq3One.high.get() : '63.5'}
              onChange={event =>
                handleEQSetting(event.target.value, event.target.name)
              }
              onClick={event =>
                isMIDIAssignButtonActive &&
                setNewMIDIControlFunction(
                  handleEQSetting,
                  'range',
                  event.target.name
                )
              }
            />
          </EQLabel>
          <p>MID</p>
          <EQLabel htmlFor="mid-frequency-one">
            <KnobIcon
              isMIDIAssignActive={isMIDIAssignButtonActive}
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
              min="0"
              max="127"
              value={eq3One ? eq3One.mid.get() : '63.5'}
              onChange={event =>
                handleEQSetting(event.target.value, event.target.name)
              }
              onClick={event =>
                isMIDIAssignButtonActive &&
                setNewMIDIControlFunction(
                  handleEQSetting,
                  'range',
                  event.target.name
                )
              }
            />
          </EQLabel>
          <p>LOW</p>
          <EQLabel htmlFor="low-frequency-one">
            <KnobIcon
              isMIDIAssignActive={isMIDIAssignButtonActive}
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
              min="0"
              max="127"
              value={eq3One ? eq3One.low.get() : '63.5'}
              onChange={event =>
                handleEQSetting(event.target.value, event.target.name)
              }
              onClick={event =>
                isMIDIAssignButtonActive &&
                setNewMIDIControlFunction(
                  handleEQSetting,
                  'range',
                  event.target.name
                )
              }
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
              isMIDIAssignActive={isMIDIAssignButtonActive}
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
              min="0"
              max="127"
              value={eq3Two ? eq3Two.high.get() : '63.5'}
              onChange={event =>
                handleEQSetting(event.target.value, event.target.name)
              }
              onClick={event =>
                isMIDIAssignButtonActive &&
                setNewMIDIControlFunction(
                  handleEQSetting,
                  'range',
                  event.target.name
                )
              }
            />
          </EQLabel>
          <p>MID</p>
          <EQLabel htmlFor="mid-frequency-two">
            <KnobIcon
              isMIDIAssignActive={isMIDIAssignButtonActive}
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
              min="0"
              max="127"
              value={eq3Two ? eq3Two.mid.get() : '63.5'}
              onChange={event =>
                handleEQSetting(event.target.value, event.target.name)
              }
              onClick={event =>
                isMIDIAssignButtonActive &&
                setNewMIDIControlFunction(
                  handleEQSetting,
                  'range',
                  event.target.name
                )
              }
            />
          </EQLabel>
          <p>LOW</p>
          <EQLabel htmlFor="low-frequency-two">
            <KnobIcon
              isMIDIAssignActive={isMIDIAssignButtonActive}
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
              min="0"
              max="127"
              value={eq3Two ? eq3Two.low.get() : '63.5'}
              onChange={event =>
                handleEQSetting(event.target.value, event.target.name)
              }
              onClick={event =>
                isMIDIAssignButtonActive &&
                setNewMIDIControlFunction(
                  handleEQSetting,
                  'range',
                  event.target.name
                )
              }
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
                isMIDIAssignButtonActive &&
                setNewMIDIControlFunction(handleFilterPlayerTwo, 'range')
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
            isMIDIAssignButtonActive &&
            setNewMIDIControlFunction(handleCrossFader, 'range')
          }
        ></CrossFader>
      </label>
    </Container>
  );

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
    const { djPlayerOne, djPlayerTwo } = useStore.getState();
    const faderValue = Number(value);
    if (faderValue === 127) {
      djPlayerOne.volume.value = -500;
    } else if (faderValue >= 63) {
      const newValue = 117 - faderValue;
      djPlayerOne.volume.value = newValue / 6.5 - 5;
    }
    if (faderValue === 0) {
      djPlayerTwo.volume.value = -500;
    } else if (faderValue <= 63) {
      const newValue = faderValue - 10;
      djPlayerTwo.volume.value = newValue / 6.5 - 5;
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
  background-color: var(--darkgray);
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
  box-shadow: inset 20px 20px var(--white);
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
