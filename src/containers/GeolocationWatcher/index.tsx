import React, {useEffect} from 'react';
import BackgroundGeolocation, {
  BackgroundGeolocationError,
} from '@mauron85/react-native-background-geolocation';

import {useCurrentActivity} from '@src/store/activity';
import {RouteEntry} from '@src/store/activity/types';
import {ActivityActions} from '@src/store/activity/actions';

const GeolocationWatcher: React.FC<{}> = ({children}) => {
  const [{activityState}, dispatch] = useCurrentActivity();
  const activityInterval = 5000;

  // configure the tracking
  useEffect(() => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 20,
      distanceFilter: 20,
      debug: false,
      notificationTitle: 'Activity tracking in the background',
      notificationText: 'On going',
      startForeground: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: activityInterval,
      fastestInterval: activityInterval,
      activitiesInterval: activityInterval,
      stopOnStillActivity: false,
    });
  }, []);

  // Start or stop the geolocation watching given the activity state
  useEffect(() => {
    if (activityState === 'notStarted') {
      registerEvents();
    }

    if (activityState === 'ongoing') {
      BackgroundGeolocation.start();
    }

    if (activityState === 'stopped') {
      BackgroundGeolocation.removeAllListeners();
    }

    if (activityState === 'paused') {
      BackgroundGeolocation.stop();
    }
  }, [activityState]);

  const registerEvents = () => {
    // Register events
    BackgroundGeolocation.on('location', ({latitude, longitude}) =>
      handleWatchPositionUpdate(latitude, longitude),
    );

    BackgroundGeolocation.on('error', error => handleWatchPositionError(error));
  };

  const handleWatchPositionUpdate = (
    latitude: number,
    longitude: number,
  ): void => {
    const newEntry: RouteEntry = {
      timestamp: Date.now(),
      coords: {
        latitude,
        longitude,
      },
    };

    dispatch({type: ActivityActions.newRouteEntry, payload: newEntry});
  };

  const handleWatchPositionError = (
    error: BackgroundGeolocationError,
  ): void => {
    console.log('[ERROR] BackgroundGeolocation error:', error);
  };

  return <>{children}</>;
};

export default GeolocationWatcher;
