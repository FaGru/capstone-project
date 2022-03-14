import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DrumMachinePage from './pages/DrumMachinePage';
import SettingsPage from './pages/SettingsPage';
import { defaultPadSettings } from './data';
import useLocalStorage from './hooks/useLocalSorage';

function App() {
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
        <Route path="/" element={<DrumMachinePage allPads={allPads} />} />
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

export default App;
