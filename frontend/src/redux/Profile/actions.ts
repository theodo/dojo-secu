import { createAsyncAction } from 'typesafe-actions';

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
