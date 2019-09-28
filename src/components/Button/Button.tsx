import React, { memo } from 'react';
import Touchable from 'react-native-platform-touchable';
import BaseButton, { BaseButtonProps } from './BaseButton';
import AppColors, { AppDarkenedColors } from '@src/utils/colors';
import localStyles from './styles';

interface ButtonProps extends BaseButtonProps {
  color: AppColors
}

interface buttonSpec {
  backgroundColor: AppColors
  androidRippleColor: AppDarkenedColors
}

const buttonColors: {[k in AppColors]: buttonSpec} = {
  [AppColors.yellow]: {
    backgroundColor: AppColors.yellow,
    androidRippleColor: AppDarkenedColors.yellow
  },
  [AppColors.red]: {
    backgroundColor: AppColors.red,
    androidRippleColor: AppDarkenedColors.red
  },
  [AppColors.white]: {
    backgroundColor: AppColors.white,
    androidRippleColor: AppDarkenedColors.white
  },
  [AppColors.dark]: {
    backgroundColor: AppColors.dark,
    androidRippleColor: AppDarkenedColors.dark
  },
  [AppColors.grey]: {
    backgroundColor: AppColors.grey,
    androidRippleColor: AppDarkenedColors.grey
  },
}

const Button: React.FC<ButtonProps> = ({children, color, ...props }) => (
  <BaseButton
    style={[
      localStyles.base,
      {backgroundColor: buttonColors[color].backgroundColor}
    ]}
    background={Touchable.Ripple(buttonColors[color].androidRippleColor)}
    {...props}
  >
    { children }
  </BaseButton>
);

export default memo(Button);