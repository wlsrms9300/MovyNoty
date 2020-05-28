import Alarm from '../../models/alarm';
import User from '../../models/user';

export const addToken = async (ctx) => {
  const { token, user, item } = ctx.request.body;
  const alarm = new Alarm({
    token,
    item,
    //user: ctx.state.user,
  });
  try {
    await User.findByIdAndUpdate(user._id, { $push: { alarm: item } });
    await alarm.save();
    ctx.body = alarm;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const readData = async (ctx) => {
  console.log('readData');
  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    var day = date.getDate() + 1; //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '.' + month + '.' + day;
  }
  try {
    var date = new Date();
    let tomorrow = getFormatDate(date);
    const alarm = await Alarm.find(
      {
        'item.days': tomorrow,
      },
      /*       {
        alarm: { $elemMatch: { days: tomorrow } },
      },
      {
        alarm: { $elemMatch: { days: tomorrow } },
      }, */
      /* {alarm : {  days: tomorrow  }}, */
    );
    ctx.body = alarm.map((post) => ({
      ...post,
      body: post.body,
    }));
/*     let option = {
      method: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      json: {
        to: token,
        notification: {
          title: 'MOVYNOTY',
          body: item.movies + '\n' + item.days,
          click_action: item.link, //이 부분에 원하는 url을 넣습니다.
          icon: item.img,
        },
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: fcm.auth,
      },
    };
    request(option, (err, res, body) => {
      dispatch(check());
      if (err) console.log(err);
      else console.log(res); //제대로 요청이 되었을 경우 response의 데이터를 출력
    }); */

    if (!alarm) {
      ctx.status = 404;
      return;
    }
    ctx.body = alarm;
    /* ctx.body = movies.map((movie) => ({
      ...movie,
      body: movie.body,
    })); */
    console.log(alarm);
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const read = async (ctx) => {
  console.log('read');
  // const { id } = ctx.query;
  // try {
  //   const alarm = await Alarm.find({ _id: id });
  //   if (!alarm) {
  //     ctx.status = 404;
  //     return;
  //   }
  //   ctx.body = alarm;
  //   /* ctx.body = movies.map((movie) => ({
  //     ...movie,
  //     body: movie.body,
  //   })); */
  // } catch (error) {
  //   ctx.throw(500, error);
  // }
};
