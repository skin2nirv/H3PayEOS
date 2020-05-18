import {PixelRatio, Platform, Dimensions} from 'react-native';
import Fonts from './Fonts';

const {height, width} = Dimensions.get('window');
export function Magnification() {
  let magnification = null;
  if (width < 375 && height <= 480) {
    magnification = '';
  } else if (width < 414) {
    if (height > 667) {
      magnification = '3x';
    } else {
      magnification = '2x';
    }
  } else {
    magnification = '3x';
  }
  return magnification;
}

export {Fonts};
