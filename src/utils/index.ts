import Permissions, {
  Status as PermissionsStatus,
} from 'react-native-permissions';
import haversine from 'haversine';
import {PixelRatio, Dimensions} from 'react-native';

import {Units, RouteEntry} from '@src/store/activity/types';

// Baselined to iPhone X/8/7/6
// https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/Displays/Displays.html
export const normaliseFont = (size: number) => {
  const baselineScreenWidth = 375;
  const {width: screenWidth} = Dimensions.get('window');
  const scale = screenWidth / baselineScreenWidth;

  return scale < 1
    ? Math.round(PixelRatio.roundToNearestPixel(size * scale))
    : size;
};

// Get distance between two coordonates using the haversine formula
export const getDistanceBetweenCoords = (
  routeEntries: RouteEntry[],
  unit: Units,
): number =>
  routeEntries.reduce((totalDistance, point, index) => {
    if (index < 1) return totalDistance;

    const lastTravelledDistance = haversine(
      routeEntries[index - 1].coords,
      point.coords,
      {unit},
    );

    return totalDistance + lastTravelledDistance;
  }, 0);

export const checkPermission = async (
  type: string,
): Promise<PermissionsStatus> => {
  try {
    return await Permissions.check(type);
  } catch (err) {
    return err;
  }
};

export const requestPermission = async (
  type: string,
): Promise<PermissionsStatus> => {
  try {
    return await Permissions.request(type);
  } catch (err) {
    return err;
  }
};

export const calculatePace = (
  newDistance: number,
  currentSplit: number,
  currentSplitStartIndex: number,
  routeEntries: RouteEntry[],
): number => {
  const ranDistanceSplitInKm = newDistance / 1000 - currentSplit;
  const timeInMin =
    (routeEntries[routeEntries.length - 1].timestamp -
      routeEntries[currentSplitStartIndex].timestamp) /
    1000 /
    60;

  return timeInMin / ranDistanceSplitInKm;
};

export const convertMeterTo = (value: number, toUnit: Units): number => {
  let result;
  switch (toUnit) {
    default:
      result = value;
      break;
    case 'km':
      result = value / 1000;
      break;
    case 'mile':
      result = value / 1609.344;
      break;
    case 'nmi':
      result = value / 1852;
      break;
  }

  return Math.round(result * 100) / 100;
};

export const formatPace = (value: number) => {
  if (value === Infinity || value === 0 || value === NaN) {
    return "--'--";
  }

  return value.toString().replace('.', "'") + '"';
};

export const convertMsToDigitDisplay = (count: number): string => {
  const hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((count % (1000 * 60)) / 1000);

  const digitHours = hours < 10 ? '0' + hours : hours;
  const digitMinutes = minutes < 10 ? '0' + minutes : minutes;
  const digitSeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours > 0 ? `${digitHours}:` : ''}${digitMinutes}:${digitSeconds}`;
};
