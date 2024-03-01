import 'styled-components';

interface Font {
  bold30: RuleSet<object>;
  bold28: RuleSet<object>;
  bold24: RuleSet<object>;
  bold22: RuleSet<object>;
  bold20: RuleSet<object>;
  bold18: RuleSet<object>;
  bold16: RuleSet<object>;
  bold14: RuleSet<object>;
  bold12: RuleSet<object>;
  bold10: RuleSet<object>;
  medium28: RuleSet<object>;
  medium24: RuleSet<object>;
  medium20: RuleSet<object>;
  medium18: RuleSet<object>;
  medium16: RuleSet<object>;
  medium14: RuleSet<object>;
  medium12: RuleSet<object>;
  regular28: RuleSet<object>;
  regular24: RuleSet<object>;
  regular18: RuleSet<object>;
  regular16: RuleSet<object>;
  regular14: RuleSet<object>;
  regular12: RuleSet<object>;
  [key: string]: RuleSet<object>;
}

interface Color {
  gray: {
    main: string;
    70: string;
    60: string;
    50: string;
    40: string;
    30: string;
    10: string;
  };
  blue: {
    main: string;
    80: string;
    70: string;
    40: string;
    10: string;
  };
  tint: {
    red: string;
    yellow: string;
    white: string;
  };
}

interface Device {
  mobile: string;
  tablet: string;
  desktop: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Color;
    font: Font;
    device: Device;
  }
}
