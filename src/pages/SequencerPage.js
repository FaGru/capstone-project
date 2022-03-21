import SequencerPad from '../components/SequencerPad'
import Sequencer from '../components/Sequencer'

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import backLogo from '../images/back.svg';

export default function SequencerPage({ allPads }) {
  return (
    <>
      <BackButton to="/">
        <img src={backLogo} alt="back-button" width="35px" height="35px" />
      </BackButton>
      <Sequencer />
      <PadList>
        {allPads.map(pad => (
          <SequencerPad
            key={pad.id}
            id={pad.id}
            color={pad.color}
            sample={pad.sample}
          />
        ))}
      </PadList>
    </>
  );
}
const BackButton = styled(NavLink)`
  margin: 15px;
  justify-self: start;
  grid-column: 1 / 2;
`;
const PadList = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  max-width: 410px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
`;