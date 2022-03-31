import styled from 'styled-components';
import { allSamples } from '../data';
import playbutton from '../images/play.svg';

export default function PadSettings({
  savePadClick,
  colorChange,
  padChange,
  sampleChange,
  allPads,
  samplePreview,
}) {
  return (
    <>
      <PreviewContainer>
        <SamplePreviewButton
          data-testid="sample-preview"
          type="button"
          onClick={samplePreview}
        >
          <img
            src={playbutton}
            alt="play preview sample"
            height="40px"
            width="40px"
          />
          <p>play sample preview</p>
        </SamplePreviewButton>
        <PreviewGrid>
          {allPads.map(pad => (
            <ButtonPreview key={pad.id} color={pad.color}>
              {Number(pad.id) + 1}
            </ButtonPreview>
          ))}
        </PreviewGrid>
      </PreviewContainer>
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
        <label htmlFor="sample-select">select a sample</label>
        <SettingsSelect
          name="samples"
          id="sample-select"
          onChange={sampleChange}
        >
          {allSamples.map(sample => (
            <option key={sample.id} value={sample.path}>
              {sample.name}
            </option>
          ))}
        </SettingsSelect>
        <SaveButton type="button" onClick={savePadClick}>
          SAVE THIS PAD
        </SaveButton>
      </DrumPadForm>
    </>
  );
}
const PreviewContainer = styled.div`
  display: flex;
`;

const SamplePreviewButton = styled.button`
  height: 124px;
  width: 95px;
  color: var(--white);
  background-color: var(--darkgray);
  margin: 0 20px 20px 10px;
  border-radius: 5px;
  border: 2px solid var(--white);
  border-top: 1px solid var(--lightgray);
  border-left: 1px solid var(--lightgray);
  box-shadow: inset 0 0 15px 5px var(--black);
  cursor: pointer;
  &:active {
    transition: ease 0.2s;
    border: 2px solid var(--lightgray);
    border: 2px solid var(--white);
  }
`;

const PreviewGrid = styled.div`
  border: 2px solid var(--white);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  margin: 0 10px 20px 20px;
  border-radius: 5px;
`;
const ButtonPreview = styled.div`
  background-color: var(--${props => props.color});
  text-align: center;
  width: 30px;
  height: 30px;
  padding: 2px;
  color: var(--black);
  border: 0.5px solid var(--black);
  border-radius: 2px;
`;

const DrumPadForm = styled.section`
  display: flex;
  flex-direction: column;
`;

const SettingsSelect = styled.select`
  text-align: center;
  margin-bottom: 15px;
  height: 40px;
  width: 250px;
  color: var(--white);
  background-color: var(--darkgray);
  border: 2px solid var(--lightgray);
  border-radius: 5px;
  box-shadow: inset 0 0 15px 8px var(--black);
  cursor: pointer;
`;

const SaveButton = styled.button`
  align-self: center;
  height: 40px;
  width: 150px;
  color: var(--green);
  background-color: var(--black);
  margin: 15px;
  border-radius: 5px;
  border: 1px solid var(--green);
  border-top: 1px solid var(--lightgray);
  border-left: 1px solid var(--lightgray);
  box-shadow: 1px 1px 5px 0.5px var(--green);
  letter-spacing: 1px;
  cursor: pointer;

  &:active {
    transition: ease 0.2s;
    border: 1px solid var(--lightgray);
    border-top: 1px solid var(--green);
    border-left: 1px solid var(--green);
  }
`;
