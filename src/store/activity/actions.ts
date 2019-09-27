export enum ActivityActions {
  start = 'ACTIVITY_START',
  stop = 'ACTIVITY_STOP',
  pause = 'ACTIVITY_PAUSE',
  resume = 'ACTIVITY_RESUME',
  clear = 'ACTIVITY_CLEAR',
  newRouteEntry = 'ACTIVITY_NEW_ROUTE_ENTRY'
}

export interface ActivityAction {
  type: ActivityActions
  payload?: any
}

