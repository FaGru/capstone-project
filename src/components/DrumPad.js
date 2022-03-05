import styled from 'styled-components';


export default function DrumPad({value, handleClick}){

  return <Pad value={value} onClick={handleClick} aria-label="Drum Pad" ></Pad>

  
}

const Pad = styled.button`

  background-color: blue;
  border-radius: 5px;
  width: 150px;
  height: 150px;

  @media (max-width: 500px) {
    width: 30vw;
    height: 30vw;
  }
  
`;