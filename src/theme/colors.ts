import { darken, lighten, rgba } from 'polished';
import { pickRandomProperty } from '../utils';

// Flat UI colors
export const flatUIColors = {
  turquoise1: '#1abc9c',
  turquoise2: '#16a085',
  green1: '#2ecc71',
  green2: '#27ae60',
  blue1: '#3498db',
  blue2: '#2980b9',
  purple1: '#9b59b6',
  purple2: '#8e44ad',
  yellow1: '#f1c40f',
  yellow2: '#f39c12',
  orange1: '#e67e22',
  orange2: '#d35400',
  red1: '#e74c3c',
  red2: '#c0392b',
  lightGrey2: '#bdc3c7',
  grey1: '#95a5a6',
  grey2: '#7f8c8d',
  darkGrey1: '#34495e',
  darkGrey2: '#2c3e50'
};

const flatUISinglePurpose = {
  lightGrey1: '#ecf0f1'
};

// Primary Tones
export const baseColor = flatUIColors[pickRandomProperty(flatUIColors) as string];
export const baseColorDarker10 = darken(0.10, baseColor);
export const baseColorDarker20 = darken(0.20, baseColor);

// State Tones
export const success = flatUIColors.green1;
export const warning = flatUIColors.yellow2;
export const error = flatUIColors.red1;

// Application Usage
export const disabledColorLight = lighten(0.4, baseColor);
export const disabledColor = baseColorDarker10;
export const disabledOpacity = 0.7;
export const overlayColor = rgba('#000000', 0.05);
export const overlayColorLight = rgba('#000000', 0.05);

// Font
export const textColor = flatUISinglePurpose.lightGrey1;
export const inverseTextColor = flatUIColors.darkGrey2;

// Testing
export const testBackgroundColor = flatUIColors.red1;
export const testBackgroundColorDarker20 = flatUIColors.red2;
