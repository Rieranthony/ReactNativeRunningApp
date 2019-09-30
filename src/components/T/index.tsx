import React, {memo} from 'react';
import {Text, TextProps} from 'react-native';

import localStyles from './styles';
import AppColors from '@src/utils/colors';

export type TVariant = 'button' | 'h1' | 'h3' | 'h4' | 'h6' | 'giant';

export type Align = 'auto' | 'left' | 'right' | 'center' | 'justify';

export interface TProps extends TextProps {
  variant?: TVariant;
  color?: AppColors;
  align?: Align;
  bold?: boolean;
  children: React.ReactNode
}

const T: React.FC<TProps> = ({
  variant = 'h6',
  color = 'white',
  align = 'left',
  bold = false,
  style,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        localStyles.base,
        localStyles[variant],
        {
          textAlign: align,
          color,
        },
        bold && localStyles.bold,
        style,
      ]}
    />
  );
};

export default memo(T);
