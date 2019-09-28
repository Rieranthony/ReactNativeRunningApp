import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';

import {useCurrentActivity} from '@src/store/activity';
import {ActivityActions} from '@src/store/activity/actions';
import {convertMeterTo} from '@src/utils';
import ScreenLayout from '@src/components/ScreenLayout';
import T from '@src/components/T';

const Activity: React.FC<{}> = () => {
  const [activity, dispatch] = useCurrentActivity();
  const {
    activityState,
    routeEntries,
    distance,
    currentSplit,
    currentPace,
  } = activity;

  useEffect(() => {
    if (activityState === 'notStarted') {
      dispatch({type: ActivityActions.start});
    }
  }, [activityState]);

  useEffect(() => {
    if (currentSplit > 0) Alert.alert('NEW SPLIT BABY: ' + currentSplit);
  }, [currentSplit]);

  return (
    <ScreenLayout>
      <>
        <T>Activity status: "{activityState}"</T>
        <T>Activity currentSplit: "{currentSplit}"</T>
        <T>Traveled distance: {convertMeterTo(distance, 'km', 2)} kms</T>
        <T>Pace: {currentPace} mins/km</T>
        <T>GPS entries: ({routeEntries.length})</T>

      </>
    </ScreenLayout>
  );
};

export default Activity;
