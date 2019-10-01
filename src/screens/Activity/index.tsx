import React, {useEffect} from 'react';
import {View, Alert, Dimensions} from 'react-native';

import {useCurrentActivity} from '@src/store/activity';
import {ActivityActions} from '@src/store/activity/actions';
import {convertMeterTo} from '@src/utils';
import ScreenLayout from '@src/components/ScreenLayout';
import T from '@src/components/T';
import ActivityDetail from '@src/components/ActivityDetail';
import ActivityController from '@src/components/ActivityController';
import localStyles from './styles';
import AppColors from '@src/utils/colors';
import StatsOverlay from '@src/components/StatsOverlay';

const Activity: React.FC<{}> = () => {
  const [activity, dispatch] = useCurrentActivity();
  const {activityState, distance, currentSplit, currentPace} = activity;

  useEffect(() => {
    if (currentSplit > 0) Alert.alert('NEW SPLIT BABY: ' + currentSplit);
  }, [currentSplit]);

  const handleChangeState = (action: ActivityActions): void =>
    dispatch({type: action});
  const distanceRan = convertMeterTo(distance, 'km', 2);
  const currentPaceSplit = currentPace.toPrecision(2);

  return (
    <>
      <ScreenLayout>
        <StatsOverlay
          distanceRan={distanceRan}
          currentPaceSplit={currentPaceSplit}
          isInBackground
        />
        <View style={localStyles.activityContainer}>
          <View style={localStyles.resultsContainer}>
            <T variant="h4">Run</T>
            <ActivityDetail
              label="Distance ran"
              value={distanceRan}
              variant="h1"
            />
            <ActivityDetail label="Time" value={'00:12:45'} variant="h3" />
            <ActivityDetail
              label="Average pace"
              value={currentPaceSplit}
              variant="h3"
            />
          </View>
          <ActivityController
            activityState={activityState}
            onChangeState={handleChangeState}
          />
        </View>
      </ScreenLayout>
    </>
  );
};

export default Activity;
