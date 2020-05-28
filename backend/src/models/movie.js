import mongoose from 'mongoose';

const { Schema } = mongoose;
//스키마
const CrawlSchema = new Schema({
  name: String,
  movies: {
      type:String,
      default:null
  },
  days:String,
  img:String,
  link: String,
});

//모델
const Movie = mongoose.model('Movie', CrawlSchema); //자동으로 복수형태로 컬렉션이름 생성(Posts)
export default Movie;
