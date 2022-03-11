import styled from 'styled-components';

export default function PadSettings({ savePadClick, colorChange, padChange }) {
  return (
    <>
      <DrumPadForm>
        <label htmlFor="pad-select">select a pad</label>
        <SettingsSelect name="pads" id="pad-select" onChange={padChange}>
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
        </SettingsSelect>
        <label htmlFor="color-select">select a color</label>
        <SettingsSelect name="colors" id="color-select" onChange={colorChange}>
          <option data-testid="color-blue">blue</option>
          <option data-testid="color-red">red</option>
          <option data-testid="color-green">green</option>
          <option data-testid="color-yellow">yellow</option>
          <option data-testid="color-purple">purple</option>
          <option data-testid="color-orange">orange</option>
        </SettingsSelect>
        <SaveButton onClick={savePadClick}>save this pad</SaveButton>
      </DrumPadForm>
    </>
  );
}
const DrumPadForm = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  gap: 10px;
`;

const SettingsSelect = styled.select`
  text-align: center;
  height: 40px;
  width: 250px;
  color: var(--white);
  background-color: var(--black);
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: var(--box-shadow-classic);
`;

const SaveButton = styled.button`
  align-self: center;
  height: 30px;
  width: 150px;
  color: var(--white);
  background-color: var(--black);
  margin: 20px;
  border-radius: 5px;
  border: 1px solid var(--gray);
  border-top: 1px solid var(--white);
  border-left: 1px solid var(--white);
  box-shadow: var(--box-shadow-classic);

  &:active {
    transition: ease 0.3s;
    border: 1px solid var(--white);
    border-top: 1px solid var(--gray);
    border-left: 1px solid var(--gray);
  }
`;
