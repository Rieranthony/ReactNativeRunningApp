import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import {useScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigator from '@src/bootstrap/navigator';
import ActivityProvider from '@src/store/activity';
import GeolocationWatcher from '@src/containers/GeolocationWatcher';
import {requestPermission as request} from '@src/utils';

useScreens();

const App: React.FC<any> = () => {
  const [permision, setPermision] = useState<boolean>(true);

  useEffect(() => {
    const requestPermission = async () => {
      const res = await request('location');

      setPermision(res === 'authorized');
    };

    requestPermission();
    Geolocation.requestAuthorization();
  }, []);

  const Navigator = createAppContainer(AppNavigator);

  return (
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <ActivityProvider>
          <GeolocationWatcher>
            <StatusBar barStyle="light-content" />
            <Navigator />
          </GeolocationWatcher>
        </ActivityProvider>
      </SafeAreaProvider>
    </View>
  );
};

export default App;
