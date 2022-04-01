import recordButton from '../images/record-single.svg';
import { useState } from 'react';
import isRecordingButton from '../images/recording-wave.gif';
import { StyledButtonImg, InvisibleButton } from './Buttons';

export default function Recorder({ recordStopClick, recordStartClick }) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      <InvisibleButton
        type="button"
        onClick={handleClick}
        data-testid="record-button"
      >
        {isRecording ? (
          <StyledButtonImg
            src={isRecordingButton}
            width="60px"
            height="60px"
            alt="stop-recording-button"
          />
        ) : (
          <StyledButtonImg
            src={recordButton}
            height="60px"
            width="60px"
            alt="start-recording-button"
          />
        )}
      </InvisibleButton>
    </>
  );
  function handleClick() {
    isRecording ? recordStopClick() : recordStartClick();
    setIsRecording(!isRecording);
  }
}
