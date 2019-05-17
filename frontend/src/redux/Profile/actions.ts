import { createAsyncAction } from 'typesafe-actions';
import User from './types';

export const levelUp = createAsyncAction(
    'Profile/LEVEL_UP_REQUEST',
    'Profile/LEVEL_UP_SUCCESS',
    'Profile/LEVEL_UP__FAILURE',
)<
    null
    ,
    Array<string> | null,
    {
        errorMessage: string;
    }
    >();

export default {
  levelUp
};
