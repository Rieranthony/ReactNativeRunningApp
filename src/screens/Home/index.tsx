import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';

import {RouteEntry} from '@src/store/activity/types';
import Map from '@src/components/Map';
import { BaseButton } from '@src/components/Button';
import { screens } from '@src/bootstrap/navigator';

const Home: React.FC<{} & NavigationInjectedProps> = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState<RouteEntry>();

  useEffect(() => {
    Geolocation.getCurrentPosition(handlePositionSuccess, handleError, {
      maximumAge: 0,
      enableHighAccuracy: true,
    });
  }, []);

  const handleError = (error: GeolocationError) => {
    console.log('Geolocation.getCurrentPosition error: ', error);
  };

  const handlePositionSuccess = (position: GeolocationResponse) => {
    setCurrentPosition({
      coords: {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      },
      timestamp: Date.now(),
    });
  };

  const handleStartActivity = () => navigation.navigate(screens.activity);

  return (
    <View style={{flex: 1}}>
      {currentPosition && (
        <Map
          longitude={currentPosition.coords.longitude}
          latitude={currentPosition.coords.latitude}
        />
      )}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          alignContent: 'center',
          flexDirection: 'column-reverse',
        }}>
        <SafeAreaView>
          <BaseButton onPress={handleStartActivity} style={{ height: 60, width: '100%', backgroundColor: '#ffffff' }}>
            <Text>Start activity</Text>
          </BaseButton>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Home;
