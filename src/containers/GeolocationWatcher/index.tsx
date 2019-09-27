import React, { useEffect } from 'react';
import Geolocation, { GeolocationResponse, GeolocationError } from '@react-native-community/geolocation';

import { useCurrentActivity } from '@src/store/activity';
import { RouteEntry } from '@src/store/activity/types';
import { ActivityActions } from '@src/store/activity/actions';

const GeolocationWatcher: React.FC<{}> = ({children}) => {
  const [{ activityState }, dispatch] = useCurrentActivity();

  // Start or stop the geolocation watching given the activity state
  useEffect(() => {
    if (activityState === 'ongoing') { 
      startRecordingPosition();
    } else {
      stopRecordingPosition();
    }
  }, [activityState])

  const startRecordingPosition = () => Geolocation.watchPosition(handleWatchPositionUpdate, handleWatchPositionError, {
    maximumAge: 0,
    distanceFilter: 30,
    enableHighAccuracy: true
  })

  const stopRecordingPosition = () => Geolocation.stopObserving()
  
  const handleWatchPositionUpdate = ({ timestamp, coords }: GeolocationResponse): void => {
    const { latitude, longitude } = coords
    const newEntry: RouteEntry = {
      timestamp,
      coords: {
        latitude,
        longitude
      }
    }

    dispatch({ type: ActivityActions.newRouteEntry, payload: newEntry })
  }

  const handleWatchPositionError = (error: GeolocationError): void => {
    console.error('handleWatchPositionError :', error)
  }

  return <>{children}</>;
};

export default GeolocationWatcher;