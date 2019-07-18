import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { makeGetRequest, makePutRequest } from 'services/networking/request';
import { fetchUserRoles, goToLevelTwo, goToLevelFour, goToLevelFive, goToLevelSix } from './actions';

// worker Saga: will be fired on GO_TO_LEVEL_FOUR_REQUEST actions
export function* goToLevelSixSaga(action: any) {
  const endpoint = `/api/level-five/level-up`;
  try {
    const response = yield call(makePutRequest, endpoint, {access_code: action.payload}, {});
    yield put(goToLevelSix.success(response.body));
  } catch (error) {
    yield put(goToLevelSix.failure({ errorMessage: error.message }));
  }
}

// worker Saga: will be fired on GO_TO_LEVEL_FOUR_REQUEST actions
export function* goToLevelFiveSaga(action: any) {
  const endpoint = `/api/level-four/level-up`;
  try {
    const response = yield call(makePutRequest, endpoint, {access_code: action.payload}, {});
    yield put(goToLevelFive.success(response.body));
  } catch (error) {
    yield put(goToLevelFive.failure({ errorMessage: error.message }));
  }
}

// worker Saga: will be fired on GO_TO_LEVEL_FOUR_REQUEST actions
export function* goToLevelFourSaga(action: any) {
  const endpoint = `/api/level-three/level-up`;
  try {
    const response = yield call(makePutRequest, endpoint, {access_code: action.payload}, {});
    yield put(goToLevelFour.success(response.body));
  } catch (error) {
    yield put(goToLevelFour.failure({ errorMessage: error.message }));
  }
}

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
  yield takeEvery(getType(goToLevelSix.request), goToLevelSixSaga);
  yield takeEvery(getType(goToLevelFive.request), goToLevelFiveSaga);
  yield takeEvery(getType(goToLevelFour.request), goToLevelFourSaga);
  yield takeEvery(getType(goToLevelTwo.request), goToLevelTwoSaga);
  yield takeEvery(getType(fetchUserRoles.request), fetchUserRolesSaga);
}
