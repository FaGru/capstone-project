import styled, {keyframes} from 'styled-components';


const animation = keyframes`
0% {background-position: top center;}
100% {background-position: bottom center;}
`;

export const BackgroundAnimation = styled.div`

&::before,
  ::after {
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    position: absolute;
    z-index: -1;
    background-image: linear-gradient(
      15deg,
      #44d62c,
      #099fff,
      #6c90f6,
      #5a05a9,
      #6b0643,
      #6b0643,
      #970533,
      #df1d5d,
      #f631a7
    );
    background-size: 100% 200%;
    background-position: center center;
    animation: ${animation} 10s infinite alternate;
  }
  &::after {
    filter: blur(60px);
  }

`