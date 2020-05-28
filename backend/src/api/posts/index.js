//post라우터
import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/',checkLoggedIn, postsCtrl.write);



const post = new Router(); // api/posts/:id를 위한 새로운 경로
post.get('/', postsCtrl.read);
post.delete('/',checkLoggedIn,postsCtrl.checkOwnPost, postsCtrl.remove);
//post.put('/',postsCtrl.replace);
post.patch('/',checkLoggedIn,postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes()) //post.routes를 통해 posts에 라우터 등록

export default posts;
