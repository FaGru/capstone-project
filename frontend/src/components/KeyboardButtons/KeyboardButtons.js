import styled from 'styled-components';
import useStore from '../../hooks/useStore';

export default function KeyboardButtons({ keyboardClick }) {
  const { isMIDIAssignButtonActive, setNewMIDIControlFunction } = useStore(
    state => state
  );

  return (
    <>
      <ButtonContainer>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="C3"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="D3"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="E3"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="F3"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="G3"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="A3"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="B3"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="C4"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="D4"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="E4"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="F4"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="G4"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="A4"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <Button
          isMIDIAssignActive={isMIDIAssignButtonActive}
          aria-label="keyboard-button"
          value="B4"
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(
                  'keyboard',
                  'normal',
                  event.target.value
                )
              : keyboardClick(event.target.value)
          }
        ></Button>
        <BlackButtonGrid>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="C#3"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="D#3"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="F#3"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="G#3"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="A#3"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="C#4"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="D#4"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="F#4"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="G#4"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
          <BlackButton
            isMIDIAssignActive={isMIDIAssignButtonActive}
            aria-label="keyboard-button"
            value="A#4"
            onMouseDown={event =>
              isMIDIAssignButtonActive
                ? setNewMIDIControlFunction(
                    'keyboard',
                    'normal',
                    event.target.value
                  )
                : keyboardClick(event.target.value)
            }
          ></BlackButton>
        </BlackButtonGrid>
      </ButtonContainer>
    </>
  );
}

const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
`;
const BlackButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 45px 90px 45px 45px 90px 45px 90px 45px 45px 35px;
  position: absolute;
`;

const Button = styled.button`
  height: 200px;
  width: 45px;
  z-index: 1;
  border: 1px solid var(--black);
  border-top: none;
  background-color: white;
  ${props =>
    props.isMIDIAssignActive &&
    'background-color: var(--purple-active); box-shadow: inset 0 0 20px 2px var(--purple-active)'};
  &:active {
    transition: ease 0.1s;
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(to bottom, white, #b6b6b6bd, #141414, black) 1
      100%;
  }
`;

const BlackButton = styled.button`
  height: 150px;
  width: 35px;
  background-color: var(--black);
  z-index: 2000;
  border: 1px solid var(--lightgray);
  border-top: none;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(37, 36, 36, 1) 70%,
    rgba(0, 0, 0, 1) 100%
  );
  ${props =>
    props.isMIDIAssignActive &&
    'background: var(--purple); box-shadow: inset 0 0 20px 2px var(--purple)'};
  &:active {
    transition: 0.2s;
    border-top: none;
    border-width: 1px;
    border-style: solid;
    border-image: linear-gradient(to top, white, #d1d1d1, #797979) 1 100%;
  }
`;
