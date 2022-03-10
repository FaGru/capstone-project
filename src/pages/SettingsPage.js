import { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function SettingsPage({ padSettings, setPadSettings }) {
  const [selectedPad, setSelectedPad] = useState('0');
  const [padColor, setPadColor] = useState('blue');
  padSettings.sort(function (a, b) {
    return a.id - b.id;
  });

  return (
    <>
      <NavLink to="/">back</NavLink>
      <DrumPadForm>
        <label>select your pad</label>
        <select onChange={e => setSelectedPad(e.target.value)}>
          <option value="0">DrumPad1</option>
          <option value="1">DrumPad2</option>
          <option value="2">DrumPad3</option>
          <option value="3">DrumPad4</option>
          <option value="4">DrumPad5</option>
          <option value="5">DrumPad6</option>
          <option value="6">DrumPad7</option>
          <option value="7">DrumPad8</option>
          <option value="8">DrumPad9</option>
          <option value="9">DrumPad10</option>
          <option value="10">DrumPad11</option>
          <option value="11">DrumPad12</option>
        </select>
        <label>select a color</label>
        <select onChange={e => setPadColor(e.target.value)}>
          <option>blue</option>
          <option>red</option>
          <option>green</option>
          <option>yellow</option>
          <option>purple</option>
          <option>orange</option>
        </select>
        <button onClick={saveClick}>save this pad</button>
      </DrumPadForm>
    </>
  );

  function saveClick() {
    const removedPad = padSettings.splice(selectedPad, 1);
    const newPad = {
      id: removedPad[0].id,
      color: padColor,
      sample: removedPad[0].sample,
    };
    setPadSettings([...padSettings, newPad]);
  }
}

const DrumPadForm = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
`;
