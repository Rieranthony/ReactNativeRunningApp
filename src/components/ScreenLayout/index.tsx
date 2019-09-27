import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import AppColors from '@src/utils/colors';

const ScreenLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SafeAreaView style={{ backgroundColor: AppColors.dark, flex: 1 }}>
    { children }
  </SafeAreaView>
)

export default memo(ScreenLayout);