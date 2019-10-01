import React from 'react';
import {View, Dimensions} from 'react-native';

import T from '../T';

interface Props {
  distanceRan: string;
  currentPaceSplit: string;
  isInBackground: boolean;
}

const StatsOverlay: React.FC<Props> = ({
  distanceRan,
  currentPaceSplit,
  isInBackground,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const OFFSET = screenHeight / 2 - screenWidth / 2;

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 50,
          paddingVertical: 24,
          backgroundColor: 'rgba(33,33,33, 0.9)',
          position: 'absolute',
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
        isInBackground && {opacity: 0.05},
      ]}>
      <T variant="giant">{distanceRan}</T>
      <T variant="giant" align="right">
        {currentPaceSplit}
      </T>
    </View>
  );
};

export default StatsOverlay;
