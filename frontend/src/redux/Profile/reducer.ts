import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { levelUp } from './actions';
import User from './types';

export type ProfileAction = ActionType<typeof levelUp>;

export type ProfileState = Readonly<User>;

const initialState: ProfileState = {
  userRoles: null,
};

const reducer = (state: ProfileState = initialState, action: AnyAction) => {
  const typedAction = action as ProfileAction;

  switch (typedAction.type) {
    case getType(levelUp.success):
      const userRoles: Array<string> | null = typedAction.payload;
      return {
        ...state,
        userRoles: userRoles !== undefined ? userRoles : null,
      };
    default:
      return state;
  }
};

export default reducer;
