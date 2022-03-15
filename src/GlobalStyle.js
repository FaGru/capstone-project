import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }



  :root {
    --black: #000000;
    --white: #ccd;
    --gray: #5a5a5a;
    --darkgray: #141414;

    --blue: #099FFF;  
    --red: #FF0000;
    --green: #44D62C;
    --purple: #C724B1;
    --yellow: #E0E722;
    --orange: #FFAD00; 
    

    --blue-active: #00FFFF;  
    --purple-active: #ff47b8;
    --yellow-active: #cfe74a;
    --orange-active: #fdce33;  
    --red-active: #fd5f54;
    --green-active: #56ff7b; 
    
    --box-shadow-classic: 1px 1px 2px 1px var(--gray);
    --box-shadow-keyboard: inset -3px -2px 5px  #e2e2e5;
  }


  body {
    margin: 0;
    padding: 0;
    background-color: #111120;
    color: #ccd;
    font-family: "Poppins", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export default GlobalStyle;
