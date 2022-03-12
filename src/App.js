import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DrumMachinePage from "./pages/DrumMachinePage";
import SettingsPage from "./pages/SettingsPage"
import { defaultPadSettings } from './data';

function App() {

  

  const [padSettings, setPadSettings] = useState(defaultPadSettings)
  console.log(padSettings)


  return (
    <div>
      <Routes>
        <Route path="/" element={<DrumMachinePage padSettings={padSettings} />} />
        <Route path="/settings" element={<SettingsPage padSettings={padSettings} setPadSettings={setPadSettings} /> }/>
      </Routes>
    </div>
  );
}




export default App;
