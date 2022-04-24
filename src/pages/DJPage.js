import DJPlayerOne from '../components/DJPlayerOne/DJPlayerOne';
import DJPlayerTwo from '../components/DJPlayerTwo/DJPlayerTwo';
import DJControls from '../components/DJControls/DJControls';

import styled from 'styled-components';
import { useState } from 'react';

export default function DJPage() {
  const [visiblePlayer, setVisiblePlayer] = useState(1);

  return (
    <PageContainer visible={visiblePlayer}>
      <DJPlayerOne
        visiblePlayer={visiblePlayer}
        setVisiblePlayer={setVisiblePlayer}
      />
      <DJControls />
      <DJPlayerTwo
        visiblePlayer={visiblePlayer}
        setVisiblePlayer={setVisiblePlayer}
      />
    </PageContainer>
  );
}
const PageContainer = styled.div`
  display: flex;
  place-content: center;
  gap: 5px;
  padding: 5px;
  @media (max-width: 600px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;
