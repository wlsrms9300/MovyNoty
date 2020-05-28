import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as API from '../lib/api/alarm';
import { takeLatest } from 'redux-saga/effects';

const [PUSH, PUSH_SUCCESS, PUSH_FAILURE] = createRequestActionTypes(
  'push/PUSH_LIST',
);
export const push = createAction(PUSH);
const pushSaga = createRequestSaga(PUSH, API.pushMessage);

export function* PushSaga() {
  yield takeLatest(PUSH, pushSaga);
}
const initialState = {
  message: null,
  error: null,
};
const pushList = handleActions(
  {
    [PUSH]: (state) => ({
      ...state,
    }),
    [PUSH_SUCCESS]: (state, { payload: message }) => ({
      ...state,
      message,
    }),
    [PUSH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);
export default pushList;
