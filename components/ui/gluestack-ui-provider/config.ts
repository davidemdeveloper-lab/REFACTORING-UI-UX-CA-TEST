'use client';

import { vars } from 'nativewind';
import { palette } from '@/design/palette';

type Mode = 'light' | 'dark';

type ScaleRecord = Record<string, string>;

const hexToRgb = (hex: string): [number, number, number] => {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;
  const bigint = parseInt(value, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const parseColorValue = (value: string): string => {
  if (value.startsWith('#')) {
    const [r, g, b] = hexToRgb(value);
    return `${r} ${g} ${b}`;
  }
  if (value.startsWith('rgba')) {
    const [r, g, b, a] = value
      .replace('rgba(', '')
      .replace(')', '')
      .split(',')
      .map((token) => token.trim());
    return `${r} ${g} ${b}${a ? ` / ${a}` : ''}`;
  }
  if (value.startsWith('rgb')) {
    const [r, g, b] = value
      .replace('rgb(', '')
      .replace(')', '')
      .split(',')
      .map((token) => token.trim());
    return `${r} ${g} ${b}`;
  }
  return value;
};

const buildScaleVars = (
  token: string,
  scale: ScaleRecord,
  mode: Mode,
  options: { includeZero?: boolean } = {}
) => {
  const numericEntries = Object.entries(scale).filter(([step]) =>
    Number.isFinite(Number(step))
  );
  const sortedEntries = numericEntries.sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );
  const lightValues = sortedEntries.map(([, value]) => parseColorValue(value));
  const darkValues = [...lightValues].reverse();
  const values = mode === 'light' ? lightValues : darkValues;

  const result: Record<string, string> = {};
  sortedEntries.forEach(([step], index) => {
    result[`--color-${token}-${step}`] = values[index];
  });

  if (options.includeZero && result[`--color-${token}-0`] === undefined) {
    const fallback = values[0] ?? '0 0 0';
    result[`--color-${token}-0`] = fallback;
  }

  return result;
};

const buildModeConfig = (mode: Mode) => {
  const light = mode === 'light';

  const typographyScale = light
    ? {
        0: palette.neutral[0] ?? palette.neutral[50],
        50: palette.neutral[100],
        100: palette.neutral[200],
        200: palette.neutral[300],
        300: palette.neutral[400],
        400: palette.neutral[500],
        500: palette.neutral[600],
        600: palette.neutral[700],
        700: palette.neutral[800],
        800: palette.neutral[900],
        900: palette.neutral[950],
        950: '#0B0D12',
      }
    : {
        0: '#0B0D12',
        50: palette.neutral[950],
        100: palette.neutral[900],
        200: palette.neutral[800],
        300: palette.neutral[700],
        400: palette.neutral[600],
        500: palette.neutral[500],
        600: palette.neutral[400],
        700: palette.neutral[300],
        800: palette.neutral[200],
        900: palette.neutral[100],
        950: palette.neutral[50],
      };

  const outlineScale = light
    ? {
        0: '#E5E8EF',
        50: palette.neutral[100],
        100: palette.neutral[200],
        200: palette.neutral[300],
        300: palette.neutral[400],
        400: palette.neutral[500],
        500: palette.neutral[600],
        600: palette.neutral[700],
        700: palette.neutral[800],
        800: palette.neutral[900],
        900: palette.neutral[950],
        950: '#0B0D12',
      }
    : {
        0: '#0B0D12',
        50: palette.neutral[950],
        100: palette.neutral[900],
        200: palette.neutral[800],
        300: palette.neutral[700],
        400: palette.neutral[600],
        500: palette.neutral[500],
        600: palette.neutral[400],
        700: palette.neutral[300],
        800: palette.neutral[200],
        900: palette.neutral[100],
        950: palette.neutral[50],
      };

  return {
    ...buildScaleVars('primary', palette.primary, mode, { includeZero: true }),
    ...buildScaleVars('secondary', palette.secondary, mode, {
      includeZero: true,
    }),
    ...buildScaleVars('tertiary', palette.accent, mode, { includeZero: true }),
    ...buildScaleVars('error', palette.danger, mode, { includeZero: true }),
    ...buildScaleVars('success', palette.success, mode, { includeZero: true }),
    ...buildScaleVars('warning', palette.warning, mode, { includeZero: true }),
    ...buildScaleVars('info', palette.info, mode, { includeZero: true }),
    ...buildScaleVars('typography', typographyScale, mode, {
      includeZero: true,
    }),
    ...buildScaleVars('outline', outlineScale, mode, { includeZero: true }),
    ...buildScaleVars('background', palette.background, mode, {
      includeZero: true,
    }),
    '--color-background-glass': parseColorValue(palette.background.glass),
    '--color-background-overlay': parseColorValue(palette.background.overlay),
    '--color-background-error': parseColorValue(palette.danger[50]),
    '--color-background-warning': parseColorValue(palette.warning[50]),
    '--color-background-success': parseColorValue(palette.success[50]),
    '--color-background-muted': parseColorValue(palette.neutral[100]),
    '--color-background-info': parseColorValue(palette.info[50]),
    '--color-indicator-primary': parseColorValue(
      light ? palette.primary[500] : palette.primary[200]
    ),
    '--color-indicator-info': parseColorValue(
      light ? palette.info[400] : palette.info[200]
    ),
    '--color-indicator-error': parseColorValue(
      light ? palette.danger[400] : palette.danger[300]
    ),
  };
};

export const config = {
  light: vars(buildModeConfig('light')),
  dark: vars(buildModeConfig('dark')),
};
