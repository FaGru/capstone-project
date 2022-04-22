import DJPlayer from '../components/DJPlayer';
import DJControls from '../components/DJControls';


import styled from 'styled-components';

export default function DJPage() {

  return (
    <PageContainer>
      <DJPlayer />
      <DJControls />

    </PageContainer>
  );


}
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 20px;
`;
