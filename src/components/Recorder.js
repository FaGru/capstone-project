import recordButton from '../images/record.svg';
import styled from 'styled-components';

export default function Recorder({ recordStopClick, recordClick, recordingSrc }) {
  return (
    <>
      <RecButton type="button" onClick={recordClick}>
        <img
          src={recordButton}
          height="50px"
          width="120px"
          alt="recording-button"
        />
      </RecButton>
      <button onClick={recordStopClick}>stooooooooooooop pls </button>
      <audio src={recordingSrc} controls></audio>
    </>
  );
}

const RecButton = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: center;
  background-color: var(--black);
  margin-top: 10px;
  padding: 3px;
`;
