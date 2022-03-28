
import styled from 'styled-components';
import useStore from '../hooks/useStore';
import close from '../images/close.svg'

export default function VolumeControl({
  isControlsVisible,
  setIsControlsVisible,
  handlePadVolume,
  handleLoopPlayerVolume,
}) {
  const loopPlayerVolume = useStore(state => state.loopPlayerVolume)
  const drumPadPlayersVolume = useStore(state => state.drumPadPlayersVolume)

  return (
    <>
      {isControlsVisible ? (
        <ControlsContainer>
          <Heading>
          <H2>Volume</H2>
          <CloseButton type="button" aria-label='close' onClick={() => setIsControlsVisible(!isControlsVisible)}>
            <img src={close} height="20px" width="20px" alt="close" />
          </CloseButton>
          </Heading>
          <label htmlFor="drum-pad-volume">Drumpads {drumPadPlayersVolume}</label>
          <input
            data-testid="pad-volume"
            name="drum-pad-volume"
            id="drum-pad-volume"
            type="range"
            min="0"
            max="100"
            defaultValue={drumPadPlayersVolume * 10}
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
            defaultValue={loopPlayerVolume * 10}
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
const Heading = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr
  
`

const H2 = styled.h2`
  margin: 0px;
  margin-bottom: 20px;
  text-align: center;
  grid-column: 2 / 3
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  grid-column: 3 / 3;
  align-self: start;
  justify-self: end;
`;