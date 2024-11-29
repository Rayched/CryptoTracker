import { useRecoilValue } from 'recoil';
import { isDarkTheme } from './modules/atoms';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './modules/themes';
import Routers from './Routes/Router';
import ToggleBtn from './modules/ToggleBtn';

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    color: ${(props) => props.theme.TextColor};
    background-color: ${(props) => props.theme.BgColor};
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const Crypto_header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titles = styled.div`
  padding: 20px 0px;
  background-color: inherit;
  display: flex;
  justify-content: center;

  font-size: 25px;
  font-weight: bold;
  color: inherit;
`;

const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-bottom: 5px;
`

const SolidBar = styled.div`
  background-color: ${(props) => props.theme.itemBgColor};
  width: 85%;
  height: 3px;
`;

function App() {
  const isDarks = useRecoilValue(isDarkTheme);

  return (
    <ThemeProvider theme={isDarks ? DarkTheme : LightTheme}>
      <Crypto_header>
        <Titles>
            Crypto Tracker
        </Titles> 
        <NavBar>
            <ToggleBtn />
        </NavBar>
        <SolidBar />
      </Crypto_header>
      <Routers />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
