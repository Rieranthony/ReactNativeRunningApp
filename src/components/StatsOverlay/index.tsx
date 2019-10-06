import React from 'react';
import {Animated, Dimensions, TouchableWithoutFeedback} from 'react-native';

import T from '@src/components/T';
import localStyles from './styles';

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
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const OFFSET = screenHeight / 2 - screenWidth / 2;

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
          },
          isInBackground && { zIndex: 0, opacity: 0.1 },
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
