import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  :root {
    --main: #50473c;
    --bg: #70a85a;
    --primary: #f35589;
    --secondary: #ffbbb3
    --dark: #037844;
    --white: rgba(255,255,255,0.5);
  }

  * {
    font-family: 'Kanit', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 10px;
  }

  button {
    background: none;
    border: none;
    outline: none;
  }

  a{
      text-decoration: none;
  }
`

export default GlobalStyle
