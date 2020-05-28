import Movie from '../../models/movie';
const puppeteer = require('puppeteer');

export const getList = async () => {
  let list = [];
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-snadbox'],
    timeout: 0,
  });
  const page = await browser.newPage();
  let totalCount = 0;
  await page.goto('http://www.cgv.co.kr/movies/pre-movies.aspx');
  let count = await page.$eval(
    '#contents > div.wrap-movie-chart > div.sect-movie-chart',
    (data) => data.childElementCount,
  );

  for (let i = 2; i <= parseInt(count / 2); i++) {
    let chk = await page.$eval(
      `#contents > div.wrap-movie-chart > div.sect-movie-chart > h4:nth-child(${
        i * 2 - 1
      })`,
      (element) => {
        return String(element.innerText);
      },
    );

    if (chk.length > 7) {
      let childCount = await page.$eval(
        `#contents > div.wrap-movie-chart > div.sect-movie-chart > ol:nth-child(${
          i * 2
        })`,
        (element) => {
          return element.childElementCount;
        },
      );

      for (let j = 0; j < childCount; j++) {
        let nameData = await page.$eval(
          `#contents > div.wrap-movie-chart > div.sect-movie-chart > ol:nth-child(${
            i * 2
          }) > li:nth-child(${j + 1}) > div.box-contents > a > strong`,
          (element) => {
            return element.textContent;
          },
        );
        let daysData = await page.$eval(
          `#contents > div.wrap-movie-chart > div.sect-movie-chart > ol:nth-child(${
            i * 2
          }) > li:nth-child(${
            j + 1
          }) > div.box-contents > span.txt-info > strong`,
          (element) => {
            return element.textContent;
          },
        );
        let imgData = await page.$eval(
          `#contents > div.wrap-movie-chart > div.sect-movie-chart > ol:nth-child(${
            i * 2
          }) > li:nth-child(${j + 1}) > div.box-image > a > span > img`,
          (element) => {
            return element.currentSrc;
          },
        );
        let link = await page.$eval(
          `#contents > div.wrap-movie-chart > div.sect-movie-chart > ol:nth-child(${
            i * 2
          }) > li:nth-child(${j + 1}) > div.box-contents > a`,
          (element) => {
            var url = 'http://www.cgv.co.kr/';
            return url + element.getAttribute('href');
          },
        );

        list[totalCount] = {
          name: 'cgv',
          movies: nameData,
          days: daysData.trim().substring(0, 10),
          img: imgData,
          link: link,
        };
        totalCount += 1;
      }
    }
  }
  await browser.close();
  return list;
};

export const setList = async (ctx) => {
  console.log('cgv start');
  const json = await getList();
  try {
    let _id = [];
    _id = await Movie.find({ name: 'cgv' }); //1 or 0 -> 0은 값안가져옴
    if (_id.length != 0) {
      await Movie.deleteMany({ _id: _id }).exec();
    }
    const movie = await Movie.collection.insertMany(json); //db save
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};
