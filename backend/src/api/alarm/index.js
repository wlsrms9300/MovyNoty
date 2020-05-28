//post라우터
import Router from 'koa-router';
import * as alarmCtrl from './alarm.ctrl';

const alarm = new Router();
alarm.post('/',alarmCtrl.addToken);
alarm.get('/',alarmCtrl.read);
//message보내기 위해 data읽어옴
alarm.get('/message',alarmCtrl.readData);

export default alarm;
