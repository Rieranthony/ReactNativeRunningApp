import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import ActivityScreen from '@src/screens/Activity';

export const screens = {
  activity: 'ACTIVITY',
};

const AppNavigator = createStackNavigator(
  {
    [screens.activity]: {
      screen: ActivityScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: screens.activity,
  },
);

export default AppNavigator;
