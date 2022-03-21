import { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';

const VolumeControl = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [padVolume, setPadVolume] = useState(5);

  useImperativeHandle(ref, () => {
   return{
    alterVisible() {
      setIsVisible(!isVisible);
    },
    padVolume: padVolume,
  }});
  return (
    <>
      {isVisible ? (
        <ControlsContainer>
          <h2>Volume</h2>
          <label htmlFor="drum-pad-volume">Drumpads {padVolume}</label>
          <input
            name="drum-pad-volume"
            id="drum-pad-volume"
            type="range"
            min="0"
            max="10"
            value={padVolume}
            onChange={handlePadVolume}
          ></input>
          <label htmlFor="drum-pad-volume">Drumloop Player</label>
          <input
            name="drum-pad-volume"
            id="drum-pad-volume"
            type="range"
          ></input>
        </ControlsContainer>
      ) : (
        ''
      )}
    </>
  );

  function handlePadVolume(e) {
    setPadVolume(e.target.value);
  }
});
export default VolumeControl;

const ControlsContainer = styled.section`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 2px solid var(--darkgray);
  border-radius: 10px;
  width: 80%;
  background-color: var(--gray);
  place-self: center;
  padding: 10px;
`;
