import styled from 'styled-components';
import useStore from '../hooks/useStore';

export default function DJControls() {
  const { faderPosition, eq3One, eq3Two } = useStore(state => state);
  const setFaderPosition = useStore(state => state.setFaderPosition);

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
              defaultValue="0"
              onChange={e => eq3One.set({ high: e.target.value })}
            ></input>
          </label>
          <label htmlFor="mid-frequency-one">
            <input
              id="mid-frequency-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="0"
              onChange={e => eq3One.set({ mid: e.target.value })}
            ></input>
          </label>
          <label htmlFor="low-frequency-one">
            <input
              id="low-frequency-one"
              type="range"
              min="-15"
              max="5"
              defaultValue="0"
              onChange={e => eq3One.set({ low: e.target.value })}
            ></input>
          </label>
        </EQ3>
        <EQ3>
          <label htmlFor="high-frequency-two">
            <input
              id="high-frequency-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="0"
              onChange={e => eq3Two.set({ high: e.target.value })}
            ></input>
          </label>
          <label htmlFor="mid-frequency-two">
            <input
              id="mid-frequency-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="0"
              onChange={e => eq3Two.set({ mid: e.target.value })}
            ></input>
          </label>
          <label htmlFor="low-frequency-two">
            <input
              id="low-frequency-two"
              type="range"
              min="-15"
              max="5"
              defaultValue="0"
              onChange={e => eq3Two.set({ low: e.target.value })}
            ></input>
          </label>
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
}

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
