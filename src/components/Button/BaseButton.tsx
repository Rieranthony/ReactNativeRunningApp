import React, {memo} from 'react';
import Touchable, {
  PlatformTouchableProps,
} from 'react-native-platform-touchable';

interface ButtonProps extends PlatformTouchableProps {
  children: React.ReactNode
}

const BaseButton: React.FC<ButtonProps> = ({children, ...props}) => (
  <Touchable {...props}>{children}</Touchable>
);
export default memo(BaseButton);
