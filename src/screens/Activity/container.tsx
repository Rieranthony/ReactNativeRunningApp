import React, {useState, useEffect, useRef} from 'react';
import Analytics from 'appcenter-analytics';

import ActivityComponent from './';
import {useCurrentActivity} from '@src/store/activity';
import {ActivityActions} from '@src/store/activity/actions';
import {convertMsToDigitDisplay} from '@src/utils';

const ActivityContainer: any = (Component: typeof ActivityComponent) => () => {
  const [activity, dispatch] = useCurrentActivity();

  // Timer
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [timerStart, setTimerStart] = useState<number>(0);
  const [timerTime, setTimerTime] = useState<number>(0);
  // Timer paused state
  const [totalTimeTimerPaused, setTotalTimeTimerPaused] = useState<number>(0);
  const [timerPausedStart, setTimerPausedStart] = useState<number>(0);
  const timerRef: any = useRef();

  // listen to the activity and init the timer logic
  useEffect(() => {
    if (
      activity.activityState === 'ongoing' ||
      activity.activityState === 'paused'
    ) {
      startPauseTimer();
    }
  }, [activity.activityState]);

  // Start or stop the timer countdown
  useEffect(() => {
    if (!timerOn) {
      clearInterval(timerRef.current);
    }

    if (timerOn) {
      timerRef.current = setInterval(
        () => setTimerTime(Date.now() - timerStart - totalTimeTimerPaused),
        1000,
      );
    }
  }, [timerOn]);

  const startPauseTimer = () => {
    const startRef = Date.now();

    // stop timer
    if (timerOn) {
      setTimerPausedStart(startRef);
      setTimerOn(false);
      return;
    }

    // If the run was paused we update the total time the run has been paused
    if (timerPausedStart > 0) {
      setTotalTimeTimerPaused(total => total + (Date.now() - timerPausedStart));
      setTimerPausedStart(0);
    }

    // If the timer never started, we noted the start time ref
    if (timerStart === 0) {
      setTimerStart(startRef);
    }

    // we activate the countdown
    setTimerOn(true);
  };

  const handleChangeState = (action: ActivityActions): void => {
    Analytics.trackEvent('Activity state changed', {Action: action});
    dispatch({type: action});
  };

  return (
    <Component
      activity={activity}
      timer={convertMsToDigitDisplay(timerTime)}
      onChangeState={handleChangeState}
    />
  );
};

export default ActivityContainer;
