import React from "react";
import { Tenant } from "../types";

const initialState = { };

export interface AppState {
    name?: string;
    description?: string;
    state?: boolean;
    actualComponentsIds?: number[];
}

export type AppActions = {
    type: 'setState'|'setName'|'setDescription'|'setActualComponentsIds';
    payload: AppState;
}

export interface AppContext {
    state: AppState
    dispatch: React.Dispatch<AppActions>
}

export default function appReducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case 'setState': {
            return {
              ...state,
              state: action.payload.state
            };
          }
          case 'setName': {
            return {
              ...state,
              name: action.payload.name
            };
          }
          case 'setDescription': {
              return {
                  ...state,
                  description: action.payload.description
              };
            }
          case 'setActualComponentsIds': {
              return {
                  ...state,
                  actualComponentsIds: action.payload.actualComponentsIds
              };
            }
      default:
        return state;
    }
    throw Error('Unknown action: ' + action.type);
}

export const TasksContext = React.createContext<AppContext>({
    state: {},
    dispatch: () => {}
})

