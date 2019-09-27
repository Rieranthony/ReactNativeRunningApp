import {ViewStyle} from 'react-native';

import Colors from '@src/utils/colors';

export const getMarkerStyle = (radius: number): ViewStyle => ({
  borderRadius: radius,
  height: radius * 2,
  width: radius * 2,
  backgroundColor: Colors.yellow,
});
