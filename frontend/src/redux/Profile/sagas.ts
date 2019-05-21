import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { makeGetRequest, makePutRequest } from 'services/networking/request';
import { fetchUserRoles, goToLevelTwo } from './actions';

// worker Saga: will be fired on GO_TO_LEVEL_TWO_REQUEST actions
export function* goToLevelTwoSaga() {
  const endpoint = `/api/level-one/level-up`;
  try {
    const response = yield call(makePutRequest, endpoint, {}, {});
    yield put(goToLevelTwo.success(response.body));
  } catch (error) {
    yield put(goToLevelTwo.failure({ errorMessage: error.message }));
  }
}

// worker Saga: will be fired on FETCH_USER_ROLES_REQUEST actions
export function* fetchUserRolesSaga() {
  const endpoint = `/auth/me`;
  try {
    const response = yield call(makeGetRequest, endpoint);
    yield put(fetchUserRoles.success(response.body));
  } catch (error) {
    yield put(fetchUserRoles.failure({ errorMessage: error.message }));
  }
}

/*
  Behavior similar to redux-thunk
  Allows concurrent fetches of user.
*/
export default function* avatarSagas() {
  yield takeEvery(getType(goToLevelTwo.request), goToLevelTwoSaga);
  yield takeEvery(getType(fetchUserRoles.request), fetchUserRolesSaga);
}
