import {StyleSheet} from 'react-native';

import AppColors from '@src/utils/colors';

export default StyleSheet.create({
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: AppColors.dark,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.1,
  },
});
