import styled from 'styled-components';

export default function VolumeControl({
  isControlsVisible,
  handlePadVolume,
  padVolume,
  loopPlayerVolume,
  handleLoopPlayerVolume,
}) {
  return (
    <>
      {isControlsVisible ? (
        <ControlsContainer>
          <H2>Volume</H2>
          <label htmlFor="drum-pad-volume">Drumpads {padVolume}</label>
          <input
            data-testid="pad-volume"
            name="drum-pad-volume"
            id="drum-pad-volume"
            type="range"
            min="0"
            max="100"
            value={padVolume * 10}
            onChange={handlePadVolume}
          ></input>
          <label htmlFor="drum-pad-volume">
            Drumloop Player {loopPlayerVolume}
          </label>
          <input
            data-testid="drumloop-volume"
            name="drum-pad-volume"
            id="drum-pad-volume"
            type="range"
            min="0"
            max="100"
            value={loopPlayerVolume * 10}
            onChange={handleLoopPlayerVolume}
          ></input>
        </ControlsContainer>
      ) : (
        ''
      )}
    </>
  );
}

const ControlsContainer = styled.section`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 5px solid var(--darkgray);
  border-radius: 10px;
  width: 300px;
  background-color: var(--gray);
  place-self: center;
  padding: 10px;
`;

const H2 = styled.h2`
  margin: 0px;
  margin-bottom: 20px;
  text-align: center;
`;
