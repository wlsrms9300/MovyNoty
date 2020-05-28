import mongoose from 'mongoose';

const { Schema } = mongoose;
//스키마
const CrawlSchema = new Schema({
  name: String,
  theater: String,
  theater_movies: {
      type:[String],
      default:null
  },
  date: String,
  allMovies:[String],
  allTheaters:[String],
  /* date:{
        type: Date,
        default: null
    },
    title: [String],
    isAlarm: {
        type: Boolean,
        default: false
    }  */
});

//모델
const Crawl = mongoose.model('Crawl', CrawlSchema); //자동으로 복수형태로 컬렉션이름 생성(Posts)
export default Crawl;
