import { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function SettingsPage({setPadSettings}) {

  const [selectedPad, setSelectedPad] = useState('DrumPad1')
  const [padColor, setPadColor] = useState('blue')
  
  return (
    <>
    <NavLink to="/" >back</NavLink>
    <DrumPadForm>
      <label>select your pad</label>
      <select onChange={(e) => setSelectedPad(e.target.value)}>
        <option>DrumPad1</option>
        <option>DrumPad2</option>
        <option>DrumPad3</option>
        <option>DrumPad4</option>
        <option>DrumPad5</option>
        <option>DrumPad6</option>
        <option>DrumPad7</option>
        <option>DrumPad8</option>
        <option>DrumPad9</option>
        <option>DrumPad10</option>
        <option>DrumPad11</option>
        <option>DrumPad12</option>
      </select>
      <label>select a color</label>
      <select onChange={(e) => setPadColor(e.target.value)}>
        <option>blue</option>
        <option>red</option>
        <option>green</option>
        <option>purple</option>
        <option>orange</option>
      </select>
      <button onClick={saveClick} >save</button>
    </DrumPadForm>
    </>
  );

  function saveClick(){
    
    setPadSettings([selectedPad, padColor])    
  }
}



const DrumPadForm = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
`;
