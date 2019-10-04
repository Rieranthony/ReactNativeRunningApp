import React, {useState, useEffect} from 'react';

import ActivityComponent from './';
import {useCurrentActivity} from '@src/store/activity';
import {ActivityActions} from '@src/store/activity/actions';
import { convertMsToDigitDisplay } from '@src/utils';

const ActivityContainer: any = (Component: typeof ActivityComponent) => () => {
  const [activity, dispatch] = useCurrentActivity();

  // Timer
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [timerStart, setTimerStart] = useState<number>(0);
  const [timerTimePaused, setTimerTimePaused] = useState<number>(0);
  const [timerTime, setTimerTime] = useState<number>(0);
  let timerRef: any;

  useEffect(() => {
    if (activity.activityState === 'ongoing') {
      startPauseTimer();
    }
  }, [activity.activityState]);

  const startPauseTimer = () => {
    const timerStartRef = Date.now()

    // stop timer
    if (timerOn) {
      clearInterval(timerRef);
      setTimerOn(false);
      return;
    }

    setTimerStart(timerStartRef);
    setTimerOn(true);

    // start timer
    timerRef = setInterval(() => {
      setTimerTime(Date.now() - timerStartRef);
    }, 1000);
  };

  const handleChangeState = (action: ActivityActions): void =>
    dispatch({type: action});

  return (
    <Component
      activity={activity}
      timer={convertMsToDigitDisplay(timerTime)}
      onChangeState={handleChangeState}
    />
  );
};

export default ActivityContainer;
