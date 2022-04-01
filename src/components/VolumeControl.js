import styled from 'styled-components';
import { motion } from 'framer-motion';
import useStore from '../hooks/useStore';
import close from '../images/close.svg';

export default function VolumeControl({
  isControlsVisible,
  setIsControlsVisible,
  handlePadVolume,
  handleLoopPlayerVolume,
}) {

  const loopPlayerVolume = useStore(state => state.loopPlayerVolume);
  const drumPadPlayersVolume = useStore(state => state.drumPadPlayersVolume);

  return (
    <>
      {isControlsVisible ? (
        <ControlsContainer
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}

        >
          <Heading>
            <H2>Volume</H2>
            <CloseButton
              type="button"
              aria-label="close"
              onClick={() => setIsControlsVisible(!isControlsVisible)}
            >
              <img src={close} height="20px" width="20px" alt="close" />
            </CloseButton>
          </Heading>
          <label htmlFor="drum-pad-volume">
            Drumpads {drumPadPlayersVolume}
          </label>
          <Input
            data-testid="pad-volume"
            name="drum-pad-volume"
            id="drum-pad-volume"
            type="range"
            min="0"
            max="100"
            defaultValue={drumPadPlayersVolume * 10}
            onChange={handlePadVolume}
          ></Input>
          <label htmlFor="drum-pad-volume">
            Drumloop Player {loopPlayerVolume}
          </label>
          <Input
            data-testid="drumloop-volume"
            name="drum-pad-volume"
            id="drum-pad-volume"
            type="range"
            min="0"
            max="100"
            defaultValue={loopPlayerVolume * 10}
            onChange={handleLoopPlayerVolume}
          ></Input>
        </ControlsContainer>
      ) : (
        ''
      )}
    </>
  );
}

const ControlsContainer = styled(motion.section)`
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--lightgray);
  border-radius: 10px;
  width: 300px;
  background-color: var(--darkgray);
  place-self: center;
  padding: 15px;
  box-shadow: inset 0 0 20px 1px var(--black);
`;
const Heading = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
  grid-column: 2 / 3;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  grid-column: 3 / 3;
  align-self: start;
  justify-self: end;
  cursor: pointer;
`;
const Input = styled.input`
  cursor: pointer;
`;
