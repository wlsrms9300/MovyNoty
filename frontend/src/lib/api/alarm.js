import client from './client';
import request from 'request';
import * as fcm from '../../fcm';

//영화관 누르면 db에서 정보 받아오기
export const addToken = ({ token, user, item }) => {
  return client.post(`/api/alarm/`, { token, user, item });
};
//메시지 푸쉬
export const pushMessage = () => {
  client.get(`/api/alarm/message`).then(
    (res) => {
      if (res.data != null) {
        res.data.map((each) => {
          const option = {
            method: 'POST',
            url: 'https://fcm.googleapis.com/fcm/send',
            json: {
              to: each.token,
              notification: {
                title: 'MOVYNOTY',
                body: each.item.movies + '\n' + each.item.days,
                click_action: each.item.link, //이 부분에 원하는 url을 넣습니다.
                icon: each.item.img,
              },
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: fcm.auth,
            },
          };
          request(option, (err, res) => {
            if (err) console.log(err);
          });
          return null;
        });
      }
    },
    (err) => {
      console.log(err);
    },
  );
};
