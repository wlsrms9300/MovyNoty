import mongoose  from "mongoose";

const{Schema} =mongoose;
//스키마
const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate:{
        type: Date,
        default: Date.now
    },
    user:{
        _id: mongoose.Types.ObjectId,
        username:String,
    }
});

//모델
const  Post = mongoose.model('Post',PostSchema);//자동으로 복수형태로 컬렉션이름 생성(Posts)
export default Post;


