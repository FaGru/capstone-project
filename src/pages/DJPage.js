import DJPlayer from '../components/DJPlayer';
import useStore from '../hooks/useStore';
import styled from 'styled-components';

export default function DJPage() {
  const faderPosition = useStore(state => state.faderPosition);
  const setFaderPosition = useStore(state => state.setFaderPosition);
  return (
    <PageContainer>
      <DJPlayer faderPosition={faderPosition} />
      <label htmlFor="dj-player-fader">
        <LineFader
          id="dj-player-fader"
          name="dj-player-fader"
          type="range"
          min="-40"
          max="40"
          defaultValue={faderPosition}
          onChange={handlePlayerFader}
        ></LineFader>
      </label>
    </PageContainer>
  );

  function handlePlayerFader(e) {
    setFaderPosition(e.target.value);
  }
}
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 20px;
`;
const LineFader = styled.input`
  width: 300px;
  align-self: center;
`;
