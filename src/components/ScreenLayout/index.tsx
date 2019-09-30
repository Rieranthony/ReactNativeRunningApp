import React, {memo} from 'react';
import {SafeAreaView, View} from 'react-native';
import AppColors from '@src/utils/colors';

const ScreenLayout: React.FC<{children: React.ReactNode}> = ({children}) => (
  <SafeAreaView style={{flex: 1, backgroundColor: AppColors.dark}}>
    <View style={{flex: 1, paddingHorizontal: 24}}>{children}</View>
  </SafeAreaView>
);

export default memo(ScreenLayout);
