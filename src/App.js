import KeyboardPage from './pages/KeyboardPage';
import DrumMachinePage from './pages/DrumMachinePage';
import SettingsPage from './pages/SettingsPage';
import RecordingsPage from './pages/RecordingsPage';
import SequencerPage from './pages/SequencerPage';
import LandingPage from './pages/LandingPage';
import DJPage from './pages/DJPage';

import useLocalStorage from './hooks/useLocalStorage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useStore from './hooks/useStore';
import { AnimatePresence } from 'framer-motion';

import { defaultPadSettings } from './data';

export default function App() {
  const location = useLocation();
  const handleUserInteraction = useStore(state => state.handleUserInteraction);
  useEffect(() => {
    handleUserInteraction();
  });

  const setAllPads = useStore(state => state.setAllPads);

  const [storagedPadSettings, setStoragedPadSettings] = useLocalStorage(
    'storagedPadSettings',
    []
  );
  const myPadSettings = [...storagedPadSettings];
  myPadSettings.sort(function (a, b) {
    return a.id - b.id;
  });

  useEffect(() => {
    setAllPads(
      myPadSettings.length === 12 ? myPadSettings : defaultPadSettings
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/drum-machine"
            element={
              <InstrumentContainer>
                <DrumMachinePage /> <KeyboardPage />
              </InstrumentContainer>
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsPage setStoragedPadSettings={setStoragedPadSettings} />
            }
          />
          <Route path="/recordings" element={<RecordingsPage />} />
          <Route path="/sequencer" element={<SequencerPage />} />
          <Route path="/dj" element={<DJPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

const InstrumentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
