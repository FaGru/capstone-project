import styled from 'styled-components'

export default function SettingsPage(){
  return (
    <SettingsContainer>
      <form>
      <label>select your pad</label>
      <select>
        <option>Drum Pad 1</option>
        <option>Drum Pad 2</option>
        <option>Drum Pad 3</option>
        <option>Drum Pad 4</option>
        <option>Drum Pad 5</option>
        <option>Drum Pad 6</option>
        <option>Drum Pad 7</option>
        <option>Drum Pad 8</option>
        <option>Drum Pad 9</option>
        <option>Drum Pad 10</option>
        <option>Drum Pad 11</option>
        <option>Drum Pad 12</option>
      </select>
      <label>select a color</label>
      <select>
        <option>blue</option>
        <option>red</option>
        <option>green</option>
        <option>purple</option>
        <option>orange</option>
      </select>
      <button>save</button>
      </form>
    </SettingsContainer>
  )
}



const SettingsContainer = styled.section`

`