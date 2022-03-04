import React from 'react'
import styled from 'styled-components'
import * as Tone from 'tone'

export default function DrumMachine() {
  return (
    <PadList>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
      <Pad></Pad>
    </PadList>
  )
}



const Pad = styled.button`
  width: 22vw;
  height: 22vw;
  background-color: blue;
  border-radius: 5px;
`

const PadList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-gap: 5px;
  margin: 20px;
`
