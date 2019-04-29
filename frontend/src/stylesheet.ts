import { createMuiTheme } from '@material-ui/core/styles';

/**
 * App spacing measurement convention
 * Use the getSpacing function below to compute padding and margin
 */
const SPACING_UNIT = 5;
const MEASUREMENT_UNIT = 'px';

/**
 * Do not use directly the colorPalette in your components
 * Create an entry in the colorUsage below instead
 */
const colorPalette = {
  greyDark: '#222',
  amberLight: '#FFD54F',
  amber: '#FFC107',
  amberDark: '#FF8F00',
};

/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
  headerBackground: colorPalette.greyDark,
  primaryTextColor: colorPalette.greyDark,
  primaryLight: colorPalette.amberLight,
  primary: colorPalette.amber,
  primaryDark: colorPalette.amberDark,
};

export const fontFamily = {
  main: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
};

export const fontSize = {
  XXLarge: '60px',
  large: '24px',
  medium: '16px',
  small: '14px',
  XSmall: '12px',
};

export const lineHeight = {
  large: '36px',
  medium: '24px',
};

export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;

// Material UI - theme, do not declare constant inside this object
export const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h2: {
      fontSize: fontSize.XXLarge,
    },
    body1: {
      fontSize: fontSize.medium,
      lineHeight: lineHeight.medium,
      color: colorUsage.primaryTextColor,
    },
    caption: {
      fontSize: fontSize.XSmall,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: fontSize.small,
      },
    },
  },
  palette: {
    primary: {
      light: colorUsage.primaryLight,
      main: colorUsage.primary,
      dark: colorUsage.primaryDark,
    },
  },
});
