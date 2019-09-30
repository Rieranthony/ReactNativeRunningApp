import React, {useEffect, Dispatch} from 'react';
import {View, Alert} from 'react-native';

import {useCurrentActivity} from '@src/store/activity';
import {ActivityActions} from '@src/store/activity/actions';
import {convertMeterTo} from '@src/utils';
import ScreenLayout from '@src/components/ScreenLayout';
import T from '@src/components/T';
import ActivityDetail from '@src/components/ActivityDetail';
import ActivityController from '@src/components/ActivityController';
import localStyles from './styles'
const Activity: React.FC<{}> = () => {
  const [activity, dispatch] = useCurrentActivity();
  const {activityState, distance, currentSplit, currentPace} = activity;

  useEffect(() => {
    if (currentSplit > 0) Alert.alert('NEW SPLIT BABY: ' + currentSplit);
  }, [currentSplit]);

  const handleChangeState = (action: ActivityActions): void => dispatch({type: action})

  return (
    <ScreenLayout>
      <View style={localStyles.activityContainer}>
        <View>
          <T variant="h4">Run</T>
          <ActivityDetail
            label="Distance ran"
            value={`${convertMeterTo(distance, 'km', 2)}`}
            variant="h1"
          />
          <ActivityDetail label="Time" value={'00:12:45'} variant="h3" />
          <ActivityDetail
            label="Average pace"
            value={`${currentPace.toPrecision(2)}`}
            variant="h3"
          />          
        </View>
        <ActivityController 
          activityState={activityState}
          onChangeState={handleChangeState}
        />
      </View>
    </ScreenLayout>
  );
};

export default Activity;
