import React, {memo, useEffect, useMemo} from 'react';
import {View, Animated, Easing} from 'react-native';

import {getMarkerStyle} from './styles';

interface Props {
  radius?: number;
  isCurrentLocation?: boolean;
}

const Marker: React.FC<Props> = ({radius = 6, isCurrentLocation = false}) => {
  const opacityValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    if (isCurrentLocation) animation.start();
  }, [isCurrentLocation]);

  return (
    <Animated.View style={[getMarkerStyle(radius), {opacity: opacityValue}]} />
  );
};

export default memo(Marker);
