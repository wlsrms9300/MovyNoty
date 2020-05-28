import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as API from '../lib/api/movie';
import { takeLatest } from 'redux-saga/effects';

const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestActionTypes(
  'crawl/UPDATE_LIST',
);
export const crawlUpdate = createAction(UPDATE);

const updateCrawlSaga = createRequestSaga(UPDATE, API.crawlUpdate);

export function* UpdateSaga() {
  yield takeLatest(UPDATE, updateCrawlSaga);
}
const initialState = {
  cinema: null,
  error: null,
};
const updateList = handleActions(
  {
    [UPDATE_SUCCESS]: (state, { payload: cinema }) => ({
      ...state,
      cinema,
    }),
    [UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);
export default updateList;
