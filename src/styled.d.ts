// Ref: https://blog.agney.dev/styled-components-&-typescript/
// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
   
    text: string;
    colorModeTransition: string;

    colors: {
      primary: string;
      accent: string;
      background: string; 
    }
  }
}