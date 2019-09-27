import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker as MarkerContainer,
} from 'react-native-maps';

import customMapStyle from './mapStyle';
import Marker from '@src/components/Marker';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
  map: {
    flex: 1,
  },
});

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({latitude, longitude}) => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      customMapStyleString={customMapStyle}
      minZoomLevel={16}
      maxZoomLevel={17}
      zoomEnabled={false}
      scrollEnabled={false}
      toolbarEnabled={false}
      pitchEnabled={false}>
      <MarkerContainer coordinate={{longitude, latitude}}>
        <Marker isCurrentLocation />
      </MarkerContainer>
    </MapView>
  </View>
);

export default React.memo(Map);
