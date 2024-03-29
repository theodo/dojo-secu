import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import {fetchUserRoles, goToLevelTwo, goToLevelFour, goToLevelFive} from './actions';
import User from './types';

export type ProfileAction = ActionType<typeof goToLevelFour | typeof goToLevelFive | typeof goToLevelTwo | typeof fetchUserRoles>;

export type ProfileState = Readonly<User>;

const initialState: ProfileState = {
  userRoles: null,
};

const reducer = (state: ProfileState = initialState, action: AnyAction) => {
  const typedAction = action as ProfileAction;

  switch (typedAction.type) {
    case getType(goToLevelFive.success): {
      const userRoles: Array<string> | null = typedAction.payload;
      return {
        ...state,
        userRoles: userRoles !== undefined ? userRoles : null,
      };
    }
    case getType(goToLevelFour.success): {
      const userRoles: Array<string> | null = typedAction.payload;
      return {
        ...state,
        userRoles: userRoles !== undefined ? userRoles : null,
      };
    }
    case getType(goToLevelTwo.success): {
      const userRoles: Array<string> | null = typedAction.payload;
      return {
        ...state,
        userRoles: userRoles !== undefined ? userRoles : null,
      };
    }
    case getType(fetchUserRoles.success):
      const userRoles: Array<string> | null = typedAction.payload.roles;
      return {
        ...state,
        userRoles: userRoles !== undefined ? userRoles : null,
      };
    default:
      return state;
  }
};

export default reducer;
