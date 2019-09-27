import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';

import {useCurrentActivity} from '@src/store/activity';
import {ActivityActions} from '@src/store/activity/actions';
import {convertMeterTo} from '@src/utils';

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
    <View>
      <Text>Activity status: "{activityState}"</Text>
      <Text>Activity currentSplit: "{currentSplit}"</Text>
      <Text>Traveled distance: {convertMeterTo(distance, 'km', 2)} kms</Text>
      <Text>Pace: {currentPace} mins/km</Text>
      <Text>GPS entries: ({routeEntries.length})</Text>
      {routeEntries.map((routeEntry, index) => (
        <Text key={index}>
          {routeEntry.coords.latitude} / {routeEntry.coords.longitude}
        </Text>
      ))}
    </View>
  );
};

export default Activity;
