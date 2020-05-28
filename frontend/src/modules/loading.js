//loading redux module
import { createAction, handleActions } from "redux-actions";

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';
//액션 생성함수(START_LOADING,START_LOADING)과 같다?
export const startLoading = createAction(
    START_LOADING,
    requestType=> requestType,
)
export const finishLoading = createAction(
    FINISH_LOADING,
    requestType=> requestType,
)

const initialState={};

const loading= handleActions(
    {
        [START_LOADING]: (state, action) =>({
            ...state,
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action) =>({
            ...state,
            [action.payload]: false,
        })
    },
    initialState,
);

export default loading;