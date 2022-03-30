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
    margin: 0;
    height: 100vh;
  
    color: #ccd;
    font-family: "Poppins", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 1rem;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
export default GlobalStyle;
