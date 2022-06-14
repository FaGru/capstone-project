import styled, { keyframes } from 'styled-components';

const animation = keyframes`
0% {background-position: top center;}
100% {background-position: bottom center;}
`;

export const BackgroundAnimation = styled.div`
  @media (max-width: 1000px) {
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
        0deg,
        #df1d5d 10%,
        #970533 25%,
        #6b0643 40%,
        #5a05a9 60%,
        #099fff 70%,
        #44d62c 80%
      );
      background-size: 100% 200%;
      background-position: center center;
      filter: blur(30px);
    }
  }
  @media (min-width: 1000px) {
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
        0,
        #44d62c,
        #099fff,
        #5a05a9,
        #6b0643,
        #6b0643,
        #970533,
        #df1d5d
      );
      background-size: 100% 200%;
      background-position: center center;
      animation: ${animation} 10s infinite alternate;
      filter: blur(30px);
    }
  }
`;
