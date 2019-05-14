import { all } from 'redux-saga/effects';

import { sagas as loginSagas } from 'redux/Login';
import { sagas as profileSagas } from 'redux/Profile';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([loginSagas(), profileSagas()]);
}
