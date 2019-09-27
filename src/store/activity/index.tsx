import React, {useReducer, useContext, Dispatch} from 'react';

import {reducer, initialState} from './reducer';
import {Activity} from './types';
import {ActivityAction} from './actions';

const ActivityContext = React.createContext<
  [Activity, Dispatch<ActivityAction>] | undefined
>(undefined);

const ActivityProvider: React.FC<{}> = ({children}) => {
  const contextValue = useReducer(reducer, initialState);

  return (
    <ActivityContext.Provider value={contextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useCurrentActivity = () =>
  useContext(ActivityContext) as [Activity, Dispatch<ActivityAction>];

export default ActivityProvider;
