import recordButton from '../images/record-single.svg';
import styled from 'styled-components';
import { useState } from 'react';
import isRecordingButton from '../images/recording-wave.gif';

export default function Recorder({ recordStopClick, recordStartClick }) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      <RecButton
        type="button"
        onClick={handleClick}
        data-testid="record-button"
      >
        {isRecording ? (
          <RecImg
            src={isRecordingButton}
            width="60px"
            height="60px"
            alt="stop-recording-button"
          />
        ) : (
          <RecImg
            src={recordButton}
            height="60px"
            width="60px"
            alt="start-recording-button"
          />
        )}
      </RecButton>
    </>
  );
  function handleClick() {
    isRecording ? recordStopClick() : recordStartClick();
    setIsRecording(!isRecording);
  }
}
const RecImg = styled.img`
  transition: ease-in 0.4s;
  border: none;
  border-bottom: 2px solid var(--lightgray);
  border-right: 2px solid var(--lightgray);
  border-radius: 100%;
  place-self: center;
  justify-self: center;
  padding: 5px;

  &:active {
    transition: ease 0.3s;
    border-top: 2px solid var(--lightgray);
    border-left: 2px solid var(--lightgray);

    filter: grayscale(100%) blur(1px) brightness(90%);

  }
`;

const RecButton = styled.button`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  place-self: start;
  justify-self: start;
  background-color: var(--darkgray);
  margin-top: 5px;
  margin-left: 5px;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  border: none;
`;
