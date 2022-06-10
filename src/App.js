import KeyboardPage from './pages/KeyboardPage';
import DrumMachinePage from './pages/DrumMachinePage';
import SettingsPage from './pages/SettingsPage';
import RecordingsPage from './pages/RecordingsPage';
import SequencerPage from './pages/SequencerPage';
import LandingPage from './pages/LandingPage';
import DJPage from './pages/DJPage';
import Navbar from './components/Navbar/Navbar';

import useLocalStorage from './hooks/useLocalStorage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useStore from './hooks/useStore';
import { AnimatePresence } from 'framer-motion';

import { defaultPadSettings } from './data';

export default function App() {
  const location = useLocation();

  const {
    isDevicePopUpVisible,
    connectedMIDIDevices,
    assignedMIDIControlMessage,
    handleUserInteraction,
    setAllPads,
  } = useStore(state => state);

  useEffect(() => {
    handleUserInteraction();
  });

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
      <DevicePopUp isVisible={isDevicePopUpVisible}>
        {connectedMIDIDevices}
      </DevicePopUp>
      {assignedMIDIControlMessage && (
        <AssignMIDIMessage>{assignedMIDIControlMessage}</AssignMIDIMessage>
      )}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/drum-machine"
            element={
              <>
                <Navbar />
                <InstrumentContainer>
                  <DrumMachinePage /> <KeyboardPage />
                </InstrumentContainer>
              </>
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
const DevicePopUp = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  border: 2px solid var(--red);
  border-radius: 10px;
  z-index: 2000;
  background-color: var(--black);
  padding: 5px;
`;
const AssignMIDIMessage = styled.div`
  position: absolute;
  left: 15px;
  top: 70px;
  border: 2px solid var(--red);
  z-index: 2000;
  background-color: var(--black);
  border-radius: 10px;
  padding: 5px;
`;
