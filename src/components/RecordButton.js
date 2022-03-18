import recordButton from '../images/record.svg';
import stopRecordButton from '../images/stop-record.svg';
import styled from 'styled-components';
import { useState } from 'react';


export default function Recorder({ recordStopClick, recordStartClick }) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      <RecButton type="button" onClick={handleClick} data-testid="record-button" >
        {isRecording ? (
          <img src={stopRecordButton} height="30px" alt="recording-button" />
        ) : (
          <img src={recordButton} height="30px" alt="recording-button" />
        )}
      </RecButton>
    </>
  );
  function handleClick() {
    isRecording ? recordStopClick() : recordStartClick();
    setIsRecording(!isRecording);
  }

}

const RecButton = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: center;
  background-color: var(--darkgray);
  margin-top: 10px;
  height: 45px;
  width: 100px;
`;
