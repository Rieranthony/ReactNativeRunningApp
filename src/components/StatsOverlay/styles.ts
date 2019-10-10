import {StyleSheet} from 'react-native';

import AppColors from '@src/utils/colors';

export default StyleSheet.create({
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingVertical: 24,
    backgroundColor: AppColors.dark,
    position: 'absolute',
    zIndex: 10,
    opacity: 0.1,
  },
});
