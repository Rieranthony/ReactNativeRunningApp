import React, {memo} from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import AppColors from '@src/utils/colors';

const ScreenLayout: React.FC<{children: React.ReactNode}> = ({children}) => (
  <SafeAreaView
    style={{flex: 1, backgroundColor: AppColors.dark}}
    forceInset={{bottom: 'never'}}>
    {children}
  </SafeAreaView>
);

export default memo(ScreenLayout);
