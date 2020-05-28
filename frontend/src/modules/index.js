import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import DBlists, { DBListSaga } from './cinema';
import updateList, { UpdateSaga } from './update';
import stateToken,{tokenSaga} from './alarm';
import pushList,{PushSaga} from './push';

//루트리듀서(리듀서들을 모아서 관리해준다)
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  DBlists,
  updateList,
  stateToken,
  pushList
});
//root saga
export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    DBListSaga(),
    UpdateSaga(),
    tokenSaga(),
    PushSaga(),
  ]);
}
export default rootReducer;
