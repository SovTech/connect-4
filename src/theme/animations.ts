import { darken } from 'polished';
import * as colors from './colors';

export function getKeyframes(darkenColor: boolean): string {
  let keyframesString = '';
  let index = 0;
  for (let color in colors.flatUIColors) {
    if (colors.flatUIColors.hasOwnProperty(color)) {
      let tempColor = colors.flatUIColors[color];
      if (darkenColor) {
        tempColor = darken(0.20, tempColor);
      }
      keyframesString += (index / 18) * 100 + '% {background-color: ' + tempColor + '}';
      index++;
    }
  }
  return keyframesString;
}
