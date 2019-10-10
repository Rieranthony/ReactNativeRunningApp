import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';

import T from '@src/components/T';
import localStyles from './styles';
import {is} from '@babel/types';

interface Props {
  distanceRan: string;
  currentPaceSplit: string;
  isInBackground: boolean;
  onClose?: () => void;
}

const StatsOverlay: React.FC<Props> = ({
  distanceRan,
  currentPaceSplit,
  isInBackground,
  onClose,
}) => {
  const [opacityValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: isInBackground ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isInBackground]);

  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const OFFSET = screenHeight / 2 - screenWidth / 2;
  const outputRange = [0.1, 1];

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Animated.View
        style={[
          localStyles.statsContainer,
          {
            height: screenWidth,
            width: screenHeight,
            transform: [
              {
                rotate: '90deg',
              },
              {translateX: OFFSET},
              {translateY: OFFSET},
            ],
            ...(isInBackground && {zIndex: 0}),
          },
          {
            opacity: opacityValue.interpolate({
              inputRange: [0, 1],
              outputRange,
            }),
          },
        ]}>
        <T variant="giant">{distanceRan}</T>
        <T variant="giant" align="right">
          {currentPaceSplit}
        </T>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default StatsOverlay;
