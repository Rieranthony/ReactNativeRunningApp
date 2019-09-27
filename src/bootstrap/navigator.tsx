import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '@src/screens/Home';
import ActivityScreen from '@src/screens/Activity';

export const screens = {
  home: 'HOME',
  activity: 'ACTIVITY',
};

const AppNavigator = createStackNavigator(
  {
    [screens.home]: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    [screens.activity]: {
      screen: ActivityScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: screens.home,
  },
);

export default AppNavigator;
