// Ref: https://blog.agney.dev/styled-components-&-typescript/
// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
   
    colorModeTransition: string;
    text: {
      heading: string;
      subtitle: string;
      body: string;
    }
    colors: {
      default: string;
      gray: string;
      brown: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      purple: string;
      pink: string;
      red: string;
    }

    background: {
      default: string;
      gray: string;
      brown: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      purple: string;
      pink: string;
      red: string;
    }


  }

}