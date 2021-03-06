import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 62.5%;
    body {
      font-size: 1.6rem;
    }

    --font: 'Roboto', sans-serif;
    --white: #ffffff;
    --black: #000000;
    --pink: #ffb3ff;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #__next {
    height: 100%;
  }
  body {
    font-family: var(--font), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--pink);
    color: var(--black);
  }
`

export default GlobalStyles