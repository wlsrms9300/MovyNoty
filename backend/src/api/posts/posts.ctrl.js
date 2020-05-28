import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;
const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const checkOwnPost = (ctx,next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};
//id검증 400-bad request
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  //if fail
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save(); //db save
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
//길이제한 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 50 ? filtered : `${filtered.slice(0, 50)}...`;
};
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  const { tag, username } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 }) //mongo에서 고유 id는 _id
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec(); //db
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-page', Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (error) {
    ctx.throw(500, error);
  }
};
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (error) {
    ctx.throw(500, error);
  }
};
export const update = async ctx => {
  const { id } = ctx.params;
  // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  // body 값이 주어졌으면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body);
  }
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/* 
let postId = 1;
const posts = [
    {
        id:1,
        title: '제목',
        body: '내용'
    }
];
//포스트 작성
export const write = ctx=>{
    const{title,body} = ctx.request.body;
    postId +=1 ;
    const post = {id: postId, title, body};
    posts.push(post);
    ctx.body = post;
}
export const list = ctx=>{
    ctx.body=posts;
}
export const read = ctx=>{
    const {id} =ctx.params;
    const post = posts.find(p => p.id.toString()===id);
    if(!post){
        ctx.status = 404;
        ctx.body={
            message: '포스트가 존재하지 않습니다'
        };
        return;
    }
    ctx.body = post;
}
export const remove = ctx=>{
    const {id} =ctx.params;
    const index = posts.findIndex(p => p.id.toString()===id);
    if(index===-1){
        ctx.status = 404;
        ctx.body={
            message: '포스트가 존재하지 않습니다'
        };
        return;
    }
    posts.splice(index,1);
    ctx.status = 204; //no content
}
//객체 수정(id제외 모두 대체)put
export const replace = ctx=>{
    const {id} =ctx.params;
    const index = posts.findIndex(p => p.id.toString()===id);
    if(index===-1){
        ctx.status = 404;
        ctx.body={
            message: '포스트가 존재하지 않습니다'
        };
        return;
    }
    //새로운 객체로 덮어쓰기(id 제외)
    posts[index] ={
        id,
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};

//특정 필드 수정(기존값 유지)patch
export const update = ctx=>{
    const {id} =ctx.params;
    const index = posts.findIndex(p => p.id.toString()===id);
    if(index===-1){
        ctx.status = 404;
        ctx.body={
            message: '포스트가 존재하지 않습니다'
        };
        return;
    }
    //새로운 객체로 덮어쓰기(id 제외)
    posts[index] ={
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};
 */
