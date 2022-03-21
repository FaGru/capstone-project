import KeyboardPage from './pages/KeyboardPage';
import DrumMachinePage from './pages/DrumMachinePage';
import SettingsPage from './pages/SettingsPage';
import RecordingsPage from './pages/RecordingsPage';
import SequencerPage from './pages/SequencerPage';

import useLocalStorage from './hooks/useLocalSorage';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { defaultPadSettings } from './data';
import styled from 'styled-components';

export default function App() {
  const [storagedPadSettings, setStoragedPadSettings] = useLocalStorage(
    'storagedPadSettings',
    []
  );
  
  const myPadSettings = [...storagedPadSettings];
  myPadSettings.sort(function (a, b) {
    return a.id - b.id;
  });
  const [allPads, setAllPads] = useState(
    myPadSettings.length === 12 ? myPadSettings : defaultPadSettings
  );
  const [myRecordings, setMyRecordings] = useState([])
 




  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <InstrumentContainer>
              <DrumMachinePage allPads={allPads} setMyRecordings={setMyRecordings} myRecordings={myRecordings} /> <KeyboardPage />
            </InstrumentContainer>
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              allPads={allPads}
              setAllPads={setAllPads}
              setStoragedPadSettings={setStoragedPadSettings}
            />
          }
        />
        <Route path="/recordings" element={<RecordingsPage myRecordings={myRecordings} />} />
        <Route path="/sequencer" element={<SequencerPage allPads={allPads} />} />
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
