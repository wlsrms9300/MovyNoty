import Movie from '../../models/movie';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

//get List
const getSoon = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-snadbox'],
    timeout: 0,
  });
  const page = await browser.newPage();
  await page.goto('https://www.megabox.co.kr/movie/comingsoon');
  await page.$eval('#btnAddMovie', (elem) => elem.click());
  let list = [];
  const bodyContent = await page.content();
  const $ = await cheerio.load(bodyContent, { decodeEntities: true });
  //Comming Soon Movie
  const $movieList = $('#movieList').children('li.no-img');
  const url = 'https://www.megabox.co.kr/movie-detail?rpstMovieNo=';
  $movieList.each(function (i) {
    list[i] = {
      name: 'megabox',
      movies: $(this).find('li.no-img > div.tit-area > p.tit').text(),
      days: $(this)
        .find('li.no-img > div.rate-date > span.date')
        .text()
        .slice(4),
      img: $(this).find('li.no-img > div.movie-list-info > img').attr('src'),
      link:
        url +
        $(this)
          .find('li.no-img > div.movie-list-info > div.movie-score > a')
          .attr('data-no'),
    };
  });

  return list;
};

//insert DB
export const crawlMegaBox = async (ctx) => {
  console.log('megabox start');
  const json = await getSoon();
  try {
    let _id = [];
    _id = await Movie.find({ name: 'megabox' }); //1 or 0 -> 0은 값안가져옴
    if (_id.length != 0) {
      await Movie.deleteMany({ _id: _id }).exec();
    }
    const movie = await Movie.collection.insertMany(json);
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};
