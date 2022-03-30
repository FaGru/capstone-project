import styled from 'styled-components';

export const StyledButtonImg = styled.img`
  transition: ease 0.4s;
  border: 1px solid var(--gray);
  border-bottom: 4px solid var(--gray);
  border-right: 4px solid var(--gray);
  border-radius: 100%;
  padding: 3px;
  background-color: var(--darkgray);

  &:active {
    transition: ease 0.2s;
    border-top: 4px solid var(--gray);
    border-left: 4px solid var(--gray);
  }
`;
export const InvisibleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
export const StartSequenceButton = styled(InvisibleButton)`
  grid-column: 2 / 3;
  justify-self: start;
  cursor: pointer;
`;

export const InstructionNavButton = styled.button`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  padding: 5px;
  color: var(--red);
  background-color: white;
  border: 2px solid var(--red);
  border-radius: 10px;
  width: 90px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
`;
