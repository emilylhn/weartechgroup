import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

//font imports
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');

//DM sans for the body -- lots of font weights available for this one
  body {
    font-family: 'DM Sans', sans-serif;
  }

//marcellus for headers -- only one fotn weight available for this 
  h1, h2, h3 {
    font-family: 'Marcellus', serif;
  }

  html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    button,  input[type="reset"] {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
`;

export default GlobalStyles;