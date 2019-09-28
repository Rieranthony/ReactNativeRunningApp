import React, {memo} from 'react';
import Touchable, {
  PlatformTouchableProps,
} from 'react-native-platform-touchable';

export interface BaseButtonProps extends PlatformTouchableProps {
  children: React.ReactNode
}

const BaseButton: React.FC<BaseButtonProps> = ({children, ...props}) => (
  <Touchable {...props}>{children}</Touchable>
);
export default memo(BaseButton);
