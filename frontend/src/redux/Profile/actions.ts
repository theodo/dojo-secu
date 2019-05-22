import { createAsyncAction } from 'typesafe-actions';
import { ApiUser } from "redux/Profile/types";

export const goToLevelFive = createAsyncAction(
    'Profile/GO_TO_LEVEL_FIVE_REQUEST',
    'Profile/GO_TO_LEVEL_FIVE_SUCCESS',
    'Profile/GO_TO_LEVEL_FIVE__FAILURE',
)<
    null
    ,
    Array<string> | null,
    {
        errorMessage: string;
    }
    >();

export const goToLevelFour = createAsyncAction(
    'Profile/GO_TO_LEVEL_FOUR_REQUEST',
    'Profile/GO_TO_LEVEL_FOUR_SUCCESS',
    'Profile/GO_TO_LEVEL_FOUR__FAILURE',
)<
    null
    ,
    Array<string> | null,
    {
        errorMessage: string;
    }
    >();

export const goToLevelTwo = createAsyncAction(
    'Profile/GO_TO_LEVEL_TWO_REQUEST',
    'Profile/GO_TO_LEVEL_TWO_SUCCESS',
    'Profile/GO_TO_LEVEL_TWO__FAILURE',
)<
    null
    ,
    Array<string> | null,
    {
        errorMessage: string;
    }
    >();

export default {
  goToLevelTwo
};

export const fetchUserRoles = createAsyncAction(
    'Profile/FETCH_USER_ROLES_REQUEST',
    'Profile/FETCH_USER_ROLES_SUCCESS',
    'Profile/FETCH_USER_ROLES_FAILURE',
)<
    null
    ,
    ApiUser,
    {
        errorMessage: string;
    }
    >();
