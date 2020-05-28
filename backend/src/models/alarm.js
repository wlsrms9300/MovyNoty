import mongoose  from "mongoose";

const{Schema} =mongoose;
//스키마
const AlarmSchema = new Schema({
    token: String,
    title: String,
    body: String,
    publishedDate:{
        type: Date,
        default: Date.now
    },
    user:{
        _id: mongoose.Types.ObjectId,
        username:String,
    },
    item:{
        
    }
});

//모델
const  Alarm = mongoose.model('Alarm',AlarmSchema);//자동으로 복수형태로 컬렉션이름 생성(Posts)
export default Alarm;


