import DJPlayerOne from '../components/DJPlayerOne/DJPlayerOne';
import DJPlayerTwo from '../components/DJPlayerTwo/DJPlayerTwo';
import DJControls from '../components/DJControls/DJControls';

import styled from 'styled-components';

export default function DJPage() {
  return (
    <PageContainer>
      <DJPlayerOne />
      <DJControls />
      <DJPlayerTwo />
    </PageContainer>
  );
}
const PageContainer = styled.div`
  display: flex;
  place-content: center;
  gap: 5px;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;
