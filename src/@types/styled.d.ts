import 'styled-components';
// se eu não realizar a importação do styled components eu declaro a tipagem do zero,
// como estou importando, ele ira usar a tipagem dele, mais a nova que estou declarando

import { defaultTheme } from '../styles/themes/default';


type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}