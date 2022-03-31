import NavAnimation from '../components/FramerMotion';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { StyledButtonImg } from '../components/Buttons';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import backButton from '../images/back.svg';
import { nanoid } from 'nanoid';
import useStore from '../hooks/useStore';

export default function RecordingsPage() {
  let playerCounter = 0;
  const myRecordings = useStore(state => state.recordings);

  return (
    <NavAnimation start="initalBottom" end="outBottom">
      <PageContainer>
        <HeadingContainer>
          <BackButton to="/drum-machine">
            <StyledButtonImg
              src={backButton}
              alt="back-button"
              width="45px"
              height="45px"
            />
          </BackButton>
          <Heading>My Recordings</Heading>
        </HeadingContainer>
        <RecordingsContainer>
          {myRecordings.length === 0 ? (
            <p>
              It's still quiet here!
              <br />
              You have to record something...
            </p>
          ) : (
            myRecordings.map(recording => (
              <div key={nanoid()}>
                <RecordingNumber key={nanoid()}>
                  Recording {myRecordings.length - playerCounter++}
                </RecordingNumber>
                <RecordingPlayer
                  key={recording.id}
                  src={recording.audio}
                  controls
                ></RecordingPlayer>
              </div>
            ))
          )}
        </RecordingsContainer>
      </PageContainer>
    </NavAnimation>
  );
}

const PageContainer = styled(BackgroundAnimation)`
  position: relative;
  height: 90vh;
  width: 95vw;
  background-color: var(--darkgray);
  border-radius: 10px;
  margin: auto;
  margin-top: 30px;
  box-shadow: inset 0 0 20px 1px var(--black);
`;

const RecordingsContainer = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const HeadingContainer = styled.header`
  display: grid;
  grid-template-columns: 15% 1fr 15%;
`;
const Heading = styled.h2`
  margin-top: 25px;
  text-align: center;
  grid-column: 2 / 3;
`;
const BackButton = styled(NavLink)`
  margin: 15px;
  justify-self: start;
  grid-column: 1 / 2;
  transform: rotate(90deg);
`;

const RecordingNumber = styled.p`
  margin: 5px;
  margin-left: 20px;
`;

const RecordingPlayer = styled.audio`
  margin-bottom: 10px;
  &::-webkit-media-controls-enclosure {
    border-radius: 40px;
    border: 2px solid var(--white);
    background-color: var(--gray);
  }
  &::-webkit-media-controls-play-button {
    -webkit-appearance: media-play-button;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-right: 3px;
    border-radius: 100%;
    background-color: var(--white);
    opacity: 100%;
  }
  &::-webkit-media-controls-current-time-display,
  ::-webkit-media-controls-time-remaining-display {
    height: 30px;
    margin: 0 1px 0 1px;
    padding: 0;
    line-height: 30px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    font-weight: bold;
    font-style: normal;
    color: white;
  }
  &::-webkit-media-controls-mute-button {
    -webkit-appearance: media-mute-button;
    display: flex;
    flex: none;
    border-radius: 100%;
    background-color: var(--white);
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 0 1px 0 0;
  }
`;
