import React, {memo} from 'react';
import {SafeAreaView, View} from 'react-native';
import AppColors from '@src/utils/colors';
import T, {TVariant} from '../T';

interface Props {
  value: string;
  label: string;
  variant: TVariant;
}

const ActivityDetail: React.FC<Props> = ({value, label, variant}) => (
  <View style={{flexDirection: 'column', marginTop: 32}}>
    <T variant="h6" color={AppColors.grey}>{label}</T>
    <T variant={variant}>{value}</T>
  </View>
);

export default memo(ActivityDetail);
