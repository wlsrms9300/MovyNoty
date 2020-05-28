import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CinemaNav from '../../components/movie/CinemaNav';
import Responsive from '../../components/common/Responsive';
import styled from 'styled-components';
import { getListByCinema } from '../../modules/cinema';
import { crawlUpdate } from '../../modules/update';
import { insertAlarm } from '../../modules/alarm';
import { check } from '../../modules/user';
import { push } from '../../modules/push';

const Wrapper = styled(Responsive)`
  align-items: center;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const CinemaNavContainer = () => {
  const [option, setOption] = useState({
    option: 'select',
  });
  const dispatch = useDispatch();
  const { cinema, user, token, selectedCinema, loading,pushLoading } = useSelector(
    ({ DBlists, user, stateToken, loading }) => ({
      token: stateToken.token,
      cinema: DBlists.cinema,
      user: user.user,
      error: DBlists.error,
      selectedCinema: DBlists.selectedCinema,
      loading: loading['crawl/UPDATE_LIST'],
      pushLoading : loading['push/PUSH_LIST']
    }),
  );
  //첫 랜더링에만 쓸 함수
  const isFirstRef = useRef(true);
  if (isFirstRef.current) {
    isFirstRef.current = false;
    dispatch(getListByCinema({ cinema: 'cgv' }));
  }

  //영화관(cgv,megabox..) 선택
  const onClick = (cinema) => {
    console.log('c' + cinema);
    dispatch(getListByCinema({ cinema }));
  };
  //update버튼
  const onUpdate = () => {
    try {
      dispatch(crawlUpdate());
    } catch (error) {
      console.log(error);
    }
  };
  //filter적용 && slectbox값변경
  const onChange = (filter) => {
    setOption({ option: filter }); //selectbox값
    let cinema = selectedCinema;
    dispatch(getListByCinema({ cinema, filter }));
  };
  //알람신청하기
  const onAlarm = (item) => {
    if (user === null) {
      alert('로그인 해주세요');
      return;
    }
    if (window.confirm('알람을 받으시겠습니까?')) {
      console.log('dispatch alarm...');
      if (token === null) {
        alert('token null');
        return null;
      }
      dispatch(insertAlarm({ token, user, item }));
      console.log('token...' + token);
    }
    dispatch(check());
  };
  const onPush = () => {
    dispatch(push());
  };
  return (
    <Wrapper>
      <CinemaNav
        onClick={onClick}
        items={cinema}
        onUpdate={onUpdate}
        user={user}
        token={token}
        onAlarm={onAlarm}
        onChange={onChange} //필터이벤트
        option={option.option} //selectbox값
        loading={loading}
        onPush={onPush}
      />
    </Wrapper>
  );
};

export default CinemaNavContainer;
