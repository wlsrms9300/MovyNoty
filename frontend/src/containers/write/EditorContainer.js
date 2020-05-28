import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '../../components/write/Editor';
import {changeField, initialize} from '../../modules/write';
//props,action(dispatch) 셋팅
const EditorContainer = ()=>{
    const dispatch = useDispatch();
    //store에서 가져오기
    const {title, body}= useSelector(({write})=>({
        title: write.title,
        body: write.body
    }));
    //useCallback 사용이유 -> 한번만 쓰게해줌(리랜더링 방지)
    const onChangeField = useCallback(payload => dispatch(changeField(payload)),[dispatch]);
    //언마운트 시 초기화
    useEffect (()=>{
        return()=>{
            dispatch(initialize());
        };
    },[dispatch]);

    return <Editor onChangeField={onChangeField} title={title} body={body}/>
}
export default EditorContainer;