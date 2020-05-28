require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMidlleware from './lib/jwtMiddleware';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); //api 라우트 적용

app.use(bodyParser());
app.use(jwtMidlleware);

app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-fronted/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  //not found 고 /api가 아니면
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
/* app.listen(port, () => {
  console.log('Listening to port %d', port);
}); */
const server = app.listen(port, () => {
  server.setTimeout(3 * 60 * 1000);
  console.log('Listening to port %d', port);
});

/* //현재 요청받는 주소와 우리가 정해 준 숫자를 기록하는 -> 두개의 미들웨어
//next 함수 호출 이후에  then을 사용하여 promise가 끝난 후 콘솔에 end
app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401;
    return;
  }
  await next();
  console.log('end');
  // next - then구조 = async - await구조;
  //next().then(() => {
  //   console.log('end');
  // }); 
});

app.use((ctx, next) => {
  console.log(2);
  next();
});
app.use((ctx) => {w
  ctx.body = 'helloooooooo';
});

app.listen(4000, () => {
  console.log('listening....to port 4000');
}); */
