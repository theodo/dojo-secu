import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { makePutRequest } from 'services/networking/request';
import { goToLevelTwo } from './actions';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* goToLevelTwoSaga() {
  const endpoint = `/api/level-one/level-up`;
  try {
    const response = yield call(makePutRequest, endpoint, {}, {});
    yield put(goToLevelTwo.success(response.body));
  } catch (error) {
    yield put(goToLevelTwo.failure({ errorMessage: error.message }));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUserRole on each dispatched `GO_TO_LEVEL_TWO_REQUEST` action.
  Allows concurrent fetches of user.
*/
export default function* avatarSagas() {
  yield takeEvery(getType(goToLevelTwo.request), goToLevelTwoSaga);
}
