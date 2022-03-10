import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DrumMachinePage from "./pages/DrumMachinePage";
import SettingsPage from "./pages/SettingsPage"


function App() {

  
  const defaultPadSettings = [
    {id: '1', color: 'yellow', sample: './audio/Samples/Scratch1.wav'},
    {id: '2', color: 'red', sample: './audio/Samples/Horn1.mp3'},
    {id: '3', color: 'purple', sample: './audio/Samples/SynthShot1.wav'},
    {id: '4', color: 'yellow', sample: './audio/Samples/CongaFinger.wav'},
    {id: '5', color: 'purple', sample: './audio/Samples/BassShot3.wav'},
    {id: '6', color: 'purple', sample: './audio/Samples/BassShot2.wav'},
    {id: '7', color: 'green', sample: './audio/Samples/Clap1.wav'},
    {id: '8', color: 'blue', sample: './audio/Samples/Brass1.wav'},
    {id: '9', color: 'blue', sample: './audio/Samples/Brass2.wav'},
    {id: '10', color: 'green', sample: './audio/Samples/Kick1.wav'},
    {id: '11', color: 'green', sample: './audio/Samples/Snare1.wav'},
    {id: '12', color: 'orange', sample: './audio/Samples/Vocal1.wav'},
  ]
  const [padSettings, setPadSettings] = useState(defaultPadSettings)
  


  return (
    <div>
      <Routes>
        <Route path="/" element={<DrumMachinePage padSettings={padSettings} />} />
        <Route path="/settings" element={<SettingsPage setPadSettings={setPadSettings} /> }/>
      </Routes>
    </div>
  );
}




export default App;
