import {Activity} from './types';
import {ActivityAction, ActivityActions} from './actions';
import {getDistanceBetweenCoords, calculatePace} from '@src/utils';

export const initialState: Activity = {
  startTime: '',
  endTime: '',
  routeEntries: [],
  distance: 0,
  activityState: 'notStarted',
  currentSplit: 0,
  currentSplitStartIndex: 0,
  currentPace: 0,
};

export const reducer = (state: Activity, action: ActivityAction): Activity => {
  switch (action.type) {
    case ActivityActions.start:
      return {
        ...state,
        startTime: new Date().toISOString(),
        activityState: 'ongoing',
      };
    case ActivityActions.stop:
      return {
        ...state,
        endTime: new Date().toISOString(),
        activityState: 'stopped',
      };
    case ActivityActions.pause:
      return {
        ...state,
        activityState: 'paused',
      };
    case ActivityActions.resume:
      return {
        ...state,
        activityState: 'ongoing',
      };
    case ActivityActions.newRouteEntry:
      let currentSplit = state.currentSplit;
      let currentSplitStartIndex = state.currentSplitStartIndex;
      // we update route entries
      const routeEntries = [...state.routeEntries, action.payload];

      // We add the distance between the last entry and the previous one
      const traveledDistance =
        state.routeEntries.length > 1
          ? getDistanceBetweenCoords(
              [
                state.routeEntries[state.routeEntries.length - 1],
                action.payload,
              ],
              'meter',
            )
          : 0;
      // we cumulate the previous distance and the traveled one
      const newDistance = state.distance + traveledDistance;

      // we round the distance to the lower number to get the current split (in KM)
      const newSplit = Math.floor(newDistance / 1000);

      // if the new split is higher than the one before, we update it and we
      // save the index of the next entry as the start of the split
      if (newSplit > state.currentSplit) {
        currentSplit = newSplit;
        currentSplitStartIndex = routeEntries.length - 1;
      }

      const currentPace = calculatePace(
        newDistance,
        currentSplit,
        currentSplitStartIndex,
        routeEntries,
      );

      return {
        ...state,
        routeEntries: [...state.routeEntries, action.payload],
        // We update the distance travelled here
        distance: newDistance,
        currentSplit,
        currentPace,
        currentSplitStartIndex,
      };
    case ActivityActions.clear:
      return {
        ...state,
        ...initialState,
      };
    default:
      throw new Error('Unexpected activity action');
  }
};
