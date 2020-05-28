import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
//api를 타고 서버로 들어가는 것들
//선언(using SAGA)
const [
  LIST_POST,
  LIST_POST_SUCCESS,
  LIST_POST_FAILURE,
] = createRequestActionTypes('post/LIST_POST');
//액션함수 생성(타입,인자)
export const listPosts = createAction(
    LIST_POST, 
    ({tag, username, page})=> ({tag, username, page})
);

//SAGA생성
const listPostSaga = createRequestSaga(LIST_POST, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POST, listPostSaga);
}

const initialState = {
  post: null,
  error: null,
  lastPage: 1,
};

//불러와서 재활용하기 위해 함수 형태로(실제 액션 함수)
const posts = handleActions(
  {
    [LIST_POST_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.headers['last-page'],10),
    }),
    [LIST_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default posts;
