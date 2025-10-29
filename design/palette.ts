export type PaletteScale = {
  0?: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type Palette = {
  primary: PaletteScale;
  secondary: PaletteScale;
  accent: PaletteScale;
  neutral: PaletteScale;
  info: PaletteScale;
  success: PaletteScale;
  warning: PaletteScale;
  danger: PaletteScale;
  background: PaletteScale & {
    glass: string;
    overlay: string;
  };
};

// Palette metal-glassy per Customer Automator
// Toni freddi e accenti caldi per ambienti alberghieri moderni
export const palette: Palette = {
  primary: {
    50: '#E7F2FF',
    100: '#C9E2FF',
    200: '#9ECBFF',
    300: '#74B3FF',
    400: '#4F9FF7',
    500: '#2E87E5',
    600: '#1F70C6',
    700: '#16589E',
    800: '#13457A',
    900: '#0F335A',
    950: '#0A243F',
  },
  secondary: {
    50: '#F6F6F9',
    100: '#ECECF1',
    200: '#DADBE4',
    300: '#C4C6D1',
    400: '#ADB0C1',
    500: '#9699B1',
    600: '#7D8298',
    700: '#636979',
    800: '#4B5060',
    900: '#343742',
    950: '#22242C',
  },
  accent: {
    50: '#FFF3E5',
    100: '#FFE4C2',
    200: '#FFD09A',
    300: '#FFB86B',
    400: '#FF9F3D',
    500: '#FF8620',
    600: '#E66812',
    700: '#BB4B0F',
    800: '#92380F',
    900: '#6C2A0E',
    950: '#451A08',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F5F7FA',
    100: '#E9ECF1',
    200: '#D5DAE1',
    300: '#C1C7D1',
    400: '#A8AFBC',
    500: '#8F97A7',
    600: '#727B8C',
    700: '#596071',
    800: '#3F4453',
    900: '#2A2E39',
    950: '#181B22',
  },
  info: {
    50: '#E8F7FB',
    100: '#CAEAF6',
    200: '#95D4ED',
    300: '#60BDE3',
    400: '#3FA6D4',
    500: '#228CBC',
    600: '#176F98',
    700: '#125576',
    800: '#0F4058',
    900: '#0C2C3C',
    950: '#081C27',
  },
  success: {
    50: '#EBFAF2',
    100: '#D4F4E2',
    200: '#A8E8C5',
    300: '#7BDCA8',
    400: '#55D091',
    500: '#37C17C',
    600: '#2BA566',
    700: '#228552',
    800: '#1B6841',
    900: '#154D30',
    950: '#0F3622',
  },
  warning: {
    50: '#FFF8E5',
    100: '#FFECC2',
    200: '#FFD58A',
    300: '#FFC055',
    400: '#FFAB29',
    500: '#F1920A',
    600: '#D27705',
    700: '#A55A08',
    800: '#7E420D',
    900: '#552D0E',
    950: '#371C09',
  },
  danger: {
    50: '#FDEBEC',
    100: '#FACDD0',
    200: '#F59EA4',
    300: '#EF6E76',
    400: '#E74B55',
    500: '#DB2E3C',
    600: '#BD1F2C',
    700: '#941822',
    800: '#6E1119',
    900: '#4B0A11',
    950: '#2F060B',
  },
  background: {
    50: '#F7F9FC',
    100: '#EDF1F7',
    200: '#DCE1ED',
    300: '#C6CCDA',
    400: '#B1B7C7',
    500: '#9198AA',
    600: '#737A8B',
    700: '#585D6F',
    800: '#3F4453',
    900: '#2C2F3A',
    950: '#1A1D25',
    glass: 'rgba(20, 27, 37, 0.58)',
    overlay: 'rgba(15, 19, 28, 0.85)',
  },
};
