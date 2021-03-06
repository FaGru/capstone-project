import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    --black: #000000;
    --white: #ccd;
    --lightgray: #5a5a5a;
    --gray: #464646;
    --darkgray:#1e1e1d;
    

    --blue: #099FFF;  
    --red: #c90a4a;
    --green: #26c50d;
    --purple: #a206a3;
    --yellow: #eeff04;
    --orange: #fe5e01; 
    

    --blue-active: #00FFFF;
    --purple-active: #F631A7;
    --yellow-active: #bbff3c;
    --orange-active: #FFAD00;
    --red-active: #fd5f54;
    --green-active: #05f2b7;
    
    --box-shadow-classic: 1px 1px 2px 1px var(--gray);
    --box-shadow-keyboard: inset -3px -2px 5px  #e2e2e5;
  }
  body {
    background-color: black;   
    color: #ccd;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    @media (max-width: 1000px){
      background-color: var(--darkgray);
    }
  }
`;
export default GlobalStyle;
