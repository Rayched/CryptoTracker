import { useRecoilState, useRecoilValue } from 'recoil';
import { isDarkTheme } from './atoms';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import RouterComponents from './Routes/Router';
import { DarkTheme, LightTheme } from './themes';

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

function App() {
  //const isDarks = useRecoilValue(isDarkTheme);
  const [isDarks, setDarks] = useRecoilState(isDarkTheme);

  const ChangeThemes = () => {
    setDarks(!isDarks);
  };

  const ItemTest = styled.div`
    width: 150px;
    height: 40px;
    padding: 5px;
    margin: 10px;
    text-align: center;
    font-weight: bold;
    color: ${(props) => props.theme.itemTextColor};
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 13px;
  `;

  return (
    <ThemeProvider theme={isDarks ? DarkTheme : LightTheme}>
      <RouterComponents />
      <GlobalStyle />
      <button onClick={ChangeThemes}>테마 변경</button>
      <ItemTest>Bitcoin</ItemTest>
      <ItemTest>Ethereum</ItemTest>
      <ItemTest>Tether</ItemTest>
      <ItemTest>Solana</ItemTest>
      <ItemTest>Dogecoin</ItemTest>
    </ThemeProvider>
  );
}

export default App;
