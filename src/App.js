import { Route, Routes } from 'react-router-dom';
import DrumMachinePage from "./pages/DrumMachinePage";
import SettingsPage from "./pages/SettingsPage"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DrumMachinePage />} />
        <Route path="/settings" element={<SettingsPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
