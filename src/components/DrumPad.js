import styled from 'styled-components';


export default function DrumPad({value, handleClick}){

  return <Pad value={value} onClick={handleClick} aria-label="Drum Pad" ></Pad>

  
}

const Pad = styled.button`

  background-color: #4895EF;
  border: none;
  border-radius: 5px;
  width: 150px;
  height: 150px;
  opacity: 90%;
 
 
  &:active {
    opacity: 100%;
    box-shadow: 0 0 5px 2px #4895EF;
  }
  @media (max-width: 500px) {
    width: 30vw;
    height: 30vw;
  }
  
`;