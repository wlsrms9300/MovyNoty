import Movie from '../../models/movie';

export const read = async (ctx, name, filter) => {
  const newFilter = filter;
  const cinema = name;
  let arr;

  try {
    //필터별 find 수정
    if (newFilter === undefined || newFilter === 'select') {
      arr = await Movie.find(
        { name: cinema },
        { _id: 1, movies: 1, days: 1, img: 1, link: 1 },
      ).lean();
    } else if (newFilter === 'date') {
      arr = await Movie.find(
        { name: cinema },
        { _id: 1, movies: 1, days: 1, img: 1, link: 1 },
      )
        .lean()
        .sort({ days: 1 });
    } else if (newFilter === 'name') {
      arr = await Movie.find(
        { name: cinema },
        { _id: 1, movies: 1, days: 1, img: 1, link: 1 },
      )
        .lean()
        .sort({ movies: 1 });
    }
    if (!arr) {
      ctx.status = 404;
      return;
    }
    arr = await arr.map((movie) => ({
      ...movie,
      movies: removeHtmlAndShorten(movie.movies),
    }));
    ctx.body = { arr, cinema };
  } catch (error) {
    ctx.throw(500, error);
  }
};
//길이제한
const removeHtmlAndShorten = (body) => {
  return body.length < 20 ? body : `${body.slice(0, 20)}...`;
};
