import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import WriterPage from './pages/WriterPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotyPage from './pages/NotyPage';
import { Helmet } from 'react-helmet-async';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { insertToken } from './modules/alarm';
import fcm from './fcm';



function App() {
  const dispatch = useDispatch();
 /*  const { token } = useSelector(({stateToken }) => ({
    token : stateToken.token
  })); */
  useEffect(() => {
    console.log('useEffect inserToken')
    firebase.initializeApp(fcm.config);
    const messaging = firebase.messaging();
    let token = '';
    messaging
      .requestPermission()
      .then(function () {
        console.log('허가!');
        token = messaging.getToken();
        return token; //토큰을 받는 함수를 추가!
      })
      .then(function (token) {
        console.log(token); //토큰을 출력!
        dispatch(insertToken(token));
      })
      .catch(function (err) {
        console.log('fcm에러 : ', err);
      });
    messaging.onTokenRefresh(function () {
      messaging
        .getToken()
        .then(function (refreshedToken) {
          insertToken(refreshedToken); //토큰이 재 생성될 경우 다시 저장
          console.log('Token refreshed.');
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });
    messaging.onMessage(function (payload) {
      alert(
        'Got a ' +
          payload.notification.title +
          '\n' +
          payload.notification.body,
      );
    });
  }, [dispatch]);

  /* const option = {
    method: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send',
    json: {
      to: token,
      notification: {
        title: 'MOVYNOTY',
        body: 'hu',
      },
    },
    headers: {
      'Content-Type': 'application/json',
       'Authorization': 'key=AAAALf8v3DI:APA91bGTCafrq-Ykz_4DazxUC4Mwj41shmNF8BSNCB0kkE8DpdDhXY3-0dO7XzXWb3IkOk39c7uRZjXACRA7nrI-jysnnsHDxsI57_FBzkd5BofMopCGrKpDyAVvgQDxs5_ShxNqloCH',
    },
  };
  request(option, (err, res, body) => {
    if (err) console.log(err);
    else console.log(res); //제대로 요청이 되었을 경우 response의 데이터를 출력
  }); */

  return (
    <>
      <Helmet>
        <title>Movy Noty</title>
      </Helmet>
      <Route component={PostListPage} path={['/@:username', '/list']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WriterPage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
      <Route component={NotyPage} path="/" exact />
    </>
  );
}

export default App;
