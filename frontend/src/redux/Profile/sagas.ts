import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { makePutRequest } from 'services/networking/request';
import { levelUp } from './actions';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* levelUpSaga() {
  const endpoint = `/api/level-one/level-up`;
  try {
    const response = yield call(makePutRequest, endpoint, {});
    yield put(levelUp.success(response.body));
  } catch (error) {
    yield put(levelUp.failure({ errorMessage: error.message }));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUserRole on each dispatched `LEVEL_UP_REQUEST` action.
  Allows concurrent fetches of user.
*/
export default function* avatarSagas() {
  yield takeEvery(getType(levelUp.request), levelUpSaga);
}
