import client from './client';

//영화관 누르면 db에서 정보 받아오기
export const getListByCinema = ({cinema, filter}) => {
  console.log(cinema, filter);
  return client.post('/api/movie/cinema', {cinema, filter}); //데이터2개 수정
};
//영화관 업데이트
export const crawlUpdate = () => {
  return client.get(`/api/movie/updateAll`);
};
