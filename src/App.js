import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DrumMachinePage from './pages/DrumMachinePage';
import SettingsPage from './pages/SettingsPage';
import { defaultPadSettings } from './data';
import useLocalStorage from './hooks/useLocalSorage';
import KeyboardPage from './pages/KeyboardPage';
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

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <InstrumentContainer>
              <DrumMachinePage allPads={allPads} /> <KeyboardPage />
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
