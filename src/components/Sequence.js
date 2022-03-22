import { useState } from 'react';
import styled from 'styled-components';


export default function Sequencer({ allPads, selectedPad, isActive, value, updateSequence } ) {
  
  
  return (

      <Button onClick={updateSequence} value={value} isActive={isActive} color={allPads[selectedPad].color} ></Button>
   
  );



}


const Button = styled.button`
  background: none;
  background-color: ${props => props.isActive ? props.color : 'none'};
  border: 2px solid var(--gray);
  border-radius: 5px;
  width: 50px;
  height: 50px;
  
  

  @media (max-width: 500px) {
    width: 11vw;
    height: 11vw;
  }
`