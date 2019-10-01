import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';

import { Button } from '@src/components/Button';
import { screens } from '@src/bootstrap/navigator';
import T from '@src/components/T';
import AppColors from '@src/utils/colors';

const Home: React.FC<{} & NavigationInjectedProps> = ({navigation}) => {
  const handleStartActivity = () => navigation.navigate(screens.activity);

  return (
    <View style={{flex: 1}}>
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
          <Button color={AppColors.yellow} onPress={handleStartActivity}>
            <T variant='button'>START RUN</T>
          </Button>
      </View>
    </View>
  );
};

export default Home;
