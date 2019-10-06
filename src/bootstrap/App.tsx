import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { Status } from 'react-native-permissions';
import {useScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigator from '@src/bootstrap/navigator';
import ActivityProvider from '@src/store/activity';
import GeolocationWatcher from '@src/containers/GeolocationWatcher';
import {requestPermission as request, checkPermission} from '@src/utils';
import AppColors from '@src/utils/colors';

useScreens();

const App: React.FC<any> = () => {
  useEffect(() => {
    const checkAndRequestPermission = async () => {
      const typeToCheck = 'location';
      const check = await checkPermission(typeToCheck);

      if (check === 'undetermined' || check === 'denied') {
        await request(typeToCheck)
      }
    };

    checkAndRequestPermission();
  }, []);

  const Navigator = createAppContainer(AppNavigator);

  return (
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <ActivityProvider>
          <GeolocationWatcher>
            <StatusBar barStyle="light-content" backgroundColor={AppColors.dark}/>
            <Navigator />
          </GeolocationWatcher>
        </ActivityProvider>
      </SafeAreaProvider>
    </View>
  );
};

export default App;
