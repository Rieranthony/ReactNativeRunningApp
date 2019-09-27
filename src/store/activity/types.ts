export type Units = 'km' | 'mile' | 'meter' | 'nmi';

export type ActivityState = 'notStarted' | 'ongoing' | 'paused' | 'stopped';

export interface RouteEntry {
  coords: Coordinate;
  timestamp: number;
}

export interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface Activity {
  startTime: string;
  endTime: string;
  routeEntries: RouteEntry[];
  distance: number;
  activityState: ActivityState;
  currentSplit: number;
  currentSplitStartIndex: number;
  currentPace: number;
}