import { css } from 'styled-components';

const bold28 = css`
  font-size: 2.8rem;
  font-weight: 700;
`;

const bold24 = css`
  font-size: 2.4rem;
  font-weight: 700;
`;

const bold22 = css`
  font-size: 2.2rem;
  font-weight: 700;
`;

const bold20 = css`
  font-size: 2rem;
  font-weight: 700;
`;

const bold18 = css`
  font-size: 1.8rem;
  font-weight: 700;
`;

const bold16 = css`
  font-size: 1.6rem;
  font-weight: 700;
`;

const bold14 = css`
  font-size: 1.4rem;
  font-weight: 700;
`;

const bold12 = css`
  font-size: 1.2rem;
  font-weight: 700;
`;

const medium28 = css`
  font-size: 2.8rem;
  font-weight: 500;
`;

const medium24 = css`
  font-size: 2.4rem;
  font-weight: 500;
`;

const medium20 = css`
  font-size: 2rem;
  font-weight: 500;
`;

const medium18 = css`
  font-size: 1.8rem;
  font-weight: 500;
`;

const medium16 = css`
  font-size: 1.6rem;
  font-weight: 500;
`;

const medium14 = css`
  font-size: 1.4rem;
  font-weight: 500;
`;

const medium12 = css`
  font-size: 1.2rem;
  font-weight: 500;
`;

const regular28 = css`
  font-size: 2.8rem;
  font-weight: 400;
`;

const regular24 = css`
  font-size: 2.4rem;
  font-weight: 400;
`;

const regular18 = css`
  font-size: 1.8rem;
  font-weight: 400;
`;

const regular16 = css`
  font-size: 1.6rem;
  font-weight: 400;
`;

const regular14 = css`
  font-size: 1.4rem;
  font-weight: 400;
`;

const regular12 = css`
  font-size: 1.2rem;
  font-weight: 400;
`;

const font = {
  bold28,
  bold24,
  bold22,
  bold20,
  bold18,
  bold16,
  bold14,
  bold12,
  medium28,
  medium24,
  medium20,
  medium18,
  medium16,
  medium14,
  medium12,
  regular28,
  regular24,
  regular18,
  regular16,
  regular14,
  regular12,
};

const color = {
  gray: {
    main: '#333333',
    70: '#4D4D4D',
    60: '#848484',
    50: '#B9BDC5',
    40: '#D6D6D6',
    30: '#F1F1F1',
    10: '#FBFAFB',
  },
  blue: {
    main: '#004BCA',
    80: '#0160FF',
    70: '#69A1FF',
    40: '#DEEAFF',
    10: '#ECF3FF',
  },
  tint: {
    red: '#FF0000',
    yellow: '#FF8B04',
  },
};

export const theme = {
  font,
  color,
};
