import DJPlayer from '../components/DJPlayer';
import DJPlayerTwo from '../components/DJPlayerTwo';
import DJControls from '../components/DJControls';

import styled from 'styled-components';

export default function DJPage() {
  return (
    <PageContainer>
      <DJPlayer />
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
