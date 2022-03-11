import PadSettings from '../components/PadSettings';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import backButton from '../images/back.svg';
import styled from 'styled-components'

export default function SettingsPage({ padSettings, setPadSettings }) {
  
  const [selectedPad, setSelectedPad] = useState('0');
  const [padColor, setPadColor] = useState('blue');
  padSettings.sort(function (a, b) {
    return a.id - b.id;
  });

  return (
    <SettingsContainer>
    <LinkButton to="/"><img src={backButton} alt='back-button' width='50px' height='50px' /></LinkButton>
    <PadSettings
      savePadClick={savePadClick}
      colorChange={colorChange}
      padChange={padChange}
    />
    </SettingsContainer>
  );


  function colorChange(e){
    setPadColor(e.target.value)
  }
  function padChange(e){
    setSelectedPad(e.target.value)
  }
  function savePadClick() {
    const removedPad = padSettings.splice(selectedPad, 1);
    const newPad = {
      id: removedPad[0].id,
      color: padColor,
      sample: removedPad[0].sample,
    };
    setPadSettings([...padSettings, newPad]);
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