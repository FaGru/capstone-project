import KeyboardPage from './pages/KeyboardPage';
import DrumMachinePage from './pages/DrumMachinePage';
import SettingsPage from './pages/SettingsPage';
import RecordingsPage from './pages/RecordingsPage';
import SequencerPage from './pages/SequencerPage';

import useLocalStorage from './hooks/useLocalSorage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { defaultPadSettings } from './data';
import styled from 'styled-components';
import useStore from './hooks/useStore';

export default function App() {
  const handleUserInteraction = useStore(state => state.handleUserInteraction);
  useEffect(() => {
    handleUserInteraction();
  });

  const getAllPads = useStore(state => state.getAllPads);
 

  const [storagedPadSettings, setStoragedPadSettings] = useLocalStorage(
    'storagedPadSettings',
    []
  );
  const myPadSettings = [...storagedPadSettings];
  myPadSettings.sort(function (a, b) {
    return a.id - b.id;
  });

  useEffect(() => {
    getAllPads(myPadSettings.length === 12 ? myPadSettings : defaultPadSettings);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <InstrumentContainer>
              <DrumMachinePage  /> <KeyboardPage />
            </InstrumentContainer>
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              setStoragedPadSettings={setStoragedPadSettings}
            />
          }
        />
        <Route path="/recordings" element={<RecordingsPage />} />
        <Route
          path="/sequencer"
          element={<SequencerPage/>}
        />
      </Routes>
    </div>
  );
}

const InstrumentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;
