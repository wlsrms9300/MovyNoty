import Movie from '../../models/movie';
import cheerio from 'cheerio';
//import Joi from '@hapi/joi';
import puppeteer from 'puppeteer';

//crawling page
async function crawl() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-snadbox'],
    timeout: 0,
  });
  const page = await browser.newPage();

  await page.goto('https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=5');
  await page.$eval('#contents > div > button', (elem) => elem.click());
  await page.$eval('#contents > div > button', (elem) => elem.click());
  await page.$eval('#contents > div > button', (elem) => elem.click());
  await page.waitFor(2000);
  return await page.$eval('#contents', (e) => e.outerHTML);
}

const getList = async () => {
  let list = [];
  const bodyContent = await crawl();
  const $ = await cheerio.load(bodyContent, { decodeEntities: true });
  $(
    '#contents > div > ul.movie_list.type2 > li:nth-child(1) > div.top_info > div > div > a:nth-child(2)',
  );
  //영화들
  const $movieList = $('#contents > div > ul.movie_list.type2').children('li');
  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '.' + month + '.' + day;
  }
  $movieList.each(function (i) {
    //let date = new Date()
    //let value = date.setDate(date.getDate()+$(this).find('.remain_info').text().slice(2)*1);
    //let day = new Date(value).toLocaleDateString('ko-KR');
    var date = new Date();
    let sumDay = $(this).find('.remain_info').text().slice(2) * 1;
    date.setDate(date.getDate() + sumDay);

    let day = getFormatDate(date);

    list[i] = {
      name: 'lotte',
      movies: $(this).find('.tit_info').text(),
      days: day, //$(this).find('.remain_info').text().slice(2),
      img: $(this).find('.poster_info img').attr('src'),
      link: $(this).find('.inner a').text('상세정보').attr('href'),
    };
  });
  return list;
};

export const setList = async (ctx) => {
  console.log('lotte start');
  const json = await getList();
  try {
    let _id = [];
    _id = await Movie.find({ name: 'lotte' }); //1 or 0 -> 0은 값안가져옴
    if (_id.length != 0) {
      await Movie.deleteMany({ _id: _id }).exec();
    }
    const movie = await Movie.collection.insertMany(json); //db save
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};
