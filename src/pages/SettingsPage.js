import PadSettings from '../components/PadSettings';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import backButton from '../images/back.svg';
import styled from 'styled-components'


export default function SettingsPage({ allPads, setAllPads, setStoragedPadSettings }) {
  
  
  const [selectedPad, setSelectedPad] = useState('0');
  const [padColor, setPadColor] = useState('blue');
  const [selectedSample, setSelectedSample] = useState('./audio/Samples/Backspin1.wav')
  const newPadSettings = allPads
  newPadSettings.sort(function (a, b) {
    return a.id - b.id;
  });
  


  return (
    <SettingsContainer>
    <LinkButton to="/"  ><img src={backButton} alt='back-button' width='50px' height='50px' /></LinkButton>
    <PadSettings
      savePadClick={savePadClick}
      colorChange={colorChange}
      padChange={padChange}
      sampleChange={sampleChange}
    />
    </SettingsContainer>
  );

  
  function padChange(e){
    setSelectedPad(e.target.value)
  }
  function colorChange(e){
    setPadColor(e.target.value)
  }
  function sampleChange(e){
    setSelectedSample(e.target.value)
  }
  function savePadClick() {
    const removedPad = newPadSettings.splice(selectedPad, 1);
    const newPad = {
      id: removedPad[0].id,
      color: padColor,
      sample: selectedSample,
    };
    
    setAllPads([...newPadSettings, newPad]);
    setStoragedPadSettings([...newPadSettings, newPad])
  }
}


const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

`

const LinkButton = styled(NavLink)`
  margin: 30px;

  
`