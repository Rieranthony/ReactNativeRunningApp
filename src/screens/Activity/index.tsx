import React, {useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import {Activity as ActivityType} from '@src/store/activity/types';
import {ActivityActions} from '@src/store/activity/actions';
import {convertMeterTo} from '@src/utils';
import ScreenLayout from '@src/components/ScreenLayout';
import T from '@src/components/T';
import ActivityDetail from '@src/components/ActivityDetail';
import ActivityController from '@src/components/ActivityController';
import localStyles from './styles';
import StatsOverlay from '@src/components/StatsOverlay';
import ActivityContainer from './container';

interface Props {
  activity: ActivityType;
  onChangeState: (action: ActivityActions) => void;
  timer: string;
}

const Activity: React.FC<Props> = ({activity, onChangeState, timer}) => {
  const {activityState, distance, currentSplit, currentPace} = activity;
  const [isActivityStatsOpen, setActivityStatsOpen] = useState<boolean>(false);
  const distanceRan = convertMeterTo(distance, 'km', 2);
  const currentPaceSplit = currentPace.toFixed(2);

  // useEffect(() => {
  //   if (currentSplit > 0) Alert.alert('NEW SPLIT BABY: ' + currentSplit);
  // }, [currentSplit]);

  const toggleStatsOpen = () =>
    setActivityStatsOpen(currentState => !currentState);

  return (
    <>
      <ScreenLayout>
        <KeepAwake />
        <StatsOverlay
          distanceRan={distanceRan}
          currentPaceSplit={currentPaceSplit}
          isInBackground={!isActivityStatsOpen}
          onClose={toggleStatsOpen}
        />
        <View style={localStyles.activityContainer}>
          <TouchableWithoutFeedback onPress={toggleStatsOpen}>
            <View style={localStyles.resultsContainer}>
              <T variant="h4">Run</T>
              <ActivityDetail
                label="Distance ran (KM)"
                value={distanceRan}
                variant="h1"
              />
              <ActivityDetail label="Time" value={timer} variant="h3" />
              <ActivityDetail
                label="Average pace"
                value={currentPaceSplit}
                variant="h3"
              />
            </View>
          </TouchableWithoutFeedback>
          <ActivityController
            activityState={activityState}
            onChangeState={onChangeState}
          />
        </View>
      </ScreenLayout>
    </>
  );
};

export default ActivityContainer(Activity);
