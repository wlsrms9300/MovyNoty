import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import movie from './movie';
import alarm from './alarm';

const api = new Router();


api.use('/posts',posts.routes())
api.use('/auth',auth.routes())
api.use('/movie',movie.routes())
api.use('/alarm',alarm.routes())

export default api;

