import styled from 'styled-components';

export default function Sequencer() {
  return (
    <SequencerContainer>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
    </SequencerContainer>
  );
}

const SequencerContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  max-width: 410px;
  grid-gap: 2px;
  margin: 10px;

`;
const Button = styled.button`
  background: none;
  border: 2px solid var(--gray);
  border-radius: 5px;
  width: 50px;
  height: 50px;
  
  

  @media (max-width: 500px) {
    width: 11vw;
    height: 11vw;
  }
`