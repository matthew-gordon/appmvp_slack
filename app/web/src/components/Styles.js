import { createGlobalStyle } from 'styled-components';

export const colors = {
  borderColor: '#eee',
  primary: '#000',
  secondary: '#14cbc4',
  accent: '#e535ab',
  background: '#fff',
  grey: '#d8d9e0',
  text: '#343c5a',
  textSecondary: '#747790',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
};

const GlobalStyle = createGlobalStyle`
  /* VARIABLES */
  :root {
    --main-color: ${colors.primary};
    --text-color: ${colors.text};
    --text-color-light: ${colors.textSecondary};
    --border-color: ${colors.borderColor};
    --bg-color: ${colors.background};
    --neutral-color: #fff;
  }
  
  /* GENERAL */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial;
    background-color: #f2f2f2;
  }

`;

export default GlobalStyle;
