import React, {memo, ReactChild} from 'react';
import {View} from 'react-native';

import AppColors from '@src/utils/colors';
import {ActivityActions} from '@src/store/activity/actions';
import {ActivityState} from '@src/store/activity/types';
import T from '@src/components/T';
import {Button} from '@src/components/Button';
import localStyles from './styles';

interface Props {
  activityState: ActivityState;
  onChangeState: (action: ActivityActions) => void;
}

const ActivityDetail: React.FC<Props> = ({activityState, onChangeState}) => {
  const controllerVariations: {[k in ActivityState]: ReactChild} = {
    notStarted: (
      <>
        <Button
          color={AppColors.yellow}
          onPress={() => onChangeState(ActivityActions.start)}>
          <T variant="button">START</T>
        </Button>
      </>
    ),
    ongoing: (
      <>
        <Button
          color={AppColors.yellow}
          onPress={() => onChangeState(ActivityActions.pause)}>
          <T variant="button">PAUSE</T>
        </Button>
      </>
    ),
    paused: (
      <>
        <Button
          color={AppColors.yellow}
          onPress={() => onChangeState(ActivityActions.resume)}>
          <T variant="button">RESUME</T>
        </Button>
        <Button
          color={AppColors.red}
          onPress={() => onChangeState(ActivityActions.stop)}>
          <T variant="button">STOP</T>
        </Button>
      </>
    ),
    stopped: <></>,
  };

  return (
    <View style={localStyles.mainContainer}>
      {activityState === 'paused' && (
        <T variant="h6" color={AppColors.grey}>
          Activity paused
        </T>
      )}
      <View style={localStyles.buttonsContainer}>
        {controllerVariations[activityState]}
      </View>
    </View>
  );
};

export default memo(ActivityDetail);
