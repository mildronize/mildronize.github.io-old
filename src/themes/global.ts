
import { createGlobalStyle } from 'styled-components'
import { lightTheme, darkTheme } from './colorMode';

// export const lightTheme = {
//   text: {
//     heading: '#2d3748',
//     body: '#2d3748',
//     subtitle: '#a0aec0',
//   },
//   colors: {
//     default: '#363537',
//     gray: 'gray',
//     brown: 'brown',
//     orange: 'orange',
//     yellow: 'yellow',
//     green: 'green',
//     blue: '#0B6E99',
//     purple: 'purple',
//     pink: 'pink',
//     red: 'red'
//   },
//   background: {
//     default: '#ffffff',
//     gray: 'gray',
//     brown: 'brown',
//     orange: 'orange',
//     yellow: 'yellow',
//     green: 'green',
//     blue: 'blue',
//     purple: 'purple',
//     pink: 'pink',
//     red: 'red'
//   }
// }

// export const darkTheme  = {

//   text: {
//     heading: '#ffffff',
//     body: '#cbd5e0',
//     subtitle: '#a0aec0',
//   },
//   colors: {

//     default: '#FAFAFA',
//     gray: 'gray',
//     brown: 'brown',
//     orange: 'orange',
//     yellow: 'yellow',
//     green: 'green',
//     blue: '#529CCA',
//     purple: 'purple',
//     pink: 'pink',
//     red: 'red'
//   },

//   background: {
//     default: '#1A202C',
//     gray: 'gray',
//     brown: 'brown',
//     orange: 'orange',
//     yellow: 'yellow',
//     green: 'green',
//     blue: 'blue',
//     purple: 'purple',
//     pink: 'pink',
//     red: 'red'
//   }
// }
export const GlobalStyles = createGlobalStyle`

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

   /**
   * Thanks to Benjamin De Cock
   * https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
   */
    :root {
    --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
    --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
    --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: font-size 0.25s var(--ease-in-out-quad), background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);

    &.theme-light{
      background: ${lightTheme.background.default};
      color: ${lightTheme.colors.default};
    }

    &.theme-dark{
      background: ${darkTheme.background.default};
      color: ${darkTheme.colors.default};
    }
  }

  a, a:visited{
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: none;
  }
  `;