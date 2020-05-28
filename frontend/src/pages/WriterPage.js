import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

//순서 페이지->모듈(액션)상태관리->콘테이너(리덕스)연결
const WriterPage = () => {
    return (
        <Responsive>
            <Helmet>
                <title>글 작성하기 - Movy Noty</title>
            </Helmet>
            <EditorContainer></EditorContainer>
            <TagBoxContainer></TagBoxContainer>
            <WriteActionButtonsContainer/>
        </Responsive>
    );
};

export default WriterPage;