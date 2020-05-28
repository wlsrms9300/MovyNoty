import Router from 'koa-router';
import * as lotte from './lotte';
import * as megabox from './megabox';
import * as mongo from './mongo';
import * as cgv from './cgv';
const movie = new Router();
//크롤링(주소 api/movie/)
//각각 크롤링
movie.get('/lotte', lotte.setList);
movie.get('/megabox', megabox.crawlMegaBox);
//병렬크롤링(업데이트 버튼)
const updateAll = async (ctx)=>{
  console.log('updateAll start')
  try {
    const async1 = lotte.setList(ctx);
    const async2 = megabox.crawlMegaBox(ctx);
    const async3 = cgv.setList(ctx);
    const funcLotte = await async1;
    const funcMegabox = await async2;
    const funcCgv = await async3;
    return (funcLotte,funcMegabox,funcCgv);
  } catch (error) {
    console.log(error);
  }
}
movie.get('/updateAll', updateAll); 



/* //롯데시네마 (Get from DB)
movie.get('/cinema/:cinema', (ctx) => {
  const { cinema } = ctx.params;
  console.log(cinema);
  return mongo.read(ctx,cinema);
}); */
//롯데시네마 (Get from DB)
movie.post('/cinema', (ctx) => { //데이터 2개 받아서 검색
  const { cinema, filter } = ctx.request.body;
  console.log('mongo.read : ',cinema, filter);
  return mongo.read(ctx, cinema, filter); 
});

export default movie;
