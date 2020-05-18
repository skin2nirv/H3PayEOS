import {Platform} from 'react-native';

const Fonts = {
  R: Platform.OS == 'ios' ? 'S-CoreDream-4Regular' : 'SCDream4',
  M: Platform.OS == 'ios' ? 'S-CoreDream-5Medium' : 'SCDream5',
  B: Platform.OS == 'ios' ? 'S-CoreDream-6Bold' : 'SCDream6',
  L: Platform.OS == 'ios' ? 'S-CoreDream-3Light' : 'SCDream3',
  EL: Platform.OS == 'ios' ? 'S-CoreDream-2ExtraLight' : 'SCDream2',
  NL: Platform.OS == 'ios' ? 'NotoSansCJKKR-Light' : 'NotoSansKR-Light',
  NDL:
    Platform.OS == 'ios' ? 'NotoSansCJKKR-DemiLight' : 'NotoSansKR-DemiLight',
  NM: Platform.OS == 'ios' ? 'NotoSansCJKKR-Medium' : 'NotoSansKR-Medium',
  NR: Platform.OS == 'ios' ? 'NotoSansCJKKR-Regular' : 'NotoSansKR-Regular',
  NB: Platform.OS == 'ios' ? 'NotoSansCJKKR-Bold' : 'NotoSansKR-Bold',
  NCB: Platform.OS == 'ios' ? 'NotoSansCJKKR-Black' : 'NotoSansKR-Black',
  BM: Platform.OS == 'ios' ? 'BMJUA' : 'BmJua',
  EXO: Platform.OS == 'ios' ? 'Exo 2' : 'Exo2',
  EXOB: Platform.OS == 'ios' ? 'Exo-Bold' : 'exo.bold',
  EXO2R: Platform.OS == 'ios' ? 'Exo2-Regular' : 'Exo2-Regular',
  EXO2L: Platform.OS == 'ios' ? 'Exo2-Light' : 'Exo2-Light',
  EXO2: Platform.OS == 'ios' ? 'Exo2-Bold' : 'Exo2-Bold',
  EXO2B: Platform.OS == 'ios' ? 'Exo2-Bold' : 'Exo2-Bold',
  EXO2SB: Platform.OS == 'ios' ? 'Exo2-SemiBold' : 'Exo2-SemiBold',
  EXO2M: Platform.OS == 'ios' ? 'Exo2-Medium' : 'Exo2-Medium',
  // Exo-Medium
};

export default Fonts;
