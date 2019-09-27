import Permissions from 'react-native-permissions';
import haversine from 'haversine';

import {Units, RouteEntry} from '@src/store/activity/types';

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

export const requestPermission = async (type: string) => {
  try {
    return await Permissions.check(type);
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

  // console.log('pace: ', (1 * ranDistanceSplitInKm) / timeInMin)

  return timeInMin / ranDistanceSplitInKm;
};

export const convertMeterTo = (
  value: number,
  toUnit: Units,
  precision: number,
): string => {
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

  return result.toPrecision(precision);
};
