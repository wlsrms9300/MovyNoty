import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
    alarm:[]
})
//this->문서인스턴스(모델내부)
UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password,10);
    this.hashedPassword = hash;
}
UserSchema.methods.checkpassword = async function(password){
    const result = await bcrypt.compare(password,this.hashedPassword);
    return result;
}
UserSchema.methods.serialize = function(){
    const data= this.toJSON();
    delete data.hashedPassword;
    return data;
}
//token을 client한테 전달하는 ()
UserSchema.methods.generateToken = function(){
    const token = jwt.sign(
        //내가 넣고싶은 것
        {
            _id: this.id,
            username: this.username,
        },
        //env안 jwt암호
        process.env.JWT_SECRET,
        //기한
        {
            expiresIn:'7d'
        }
    );
    return token;
}


//this->User(모델)
UserSchema.statics.findByUsername = function(username){
    return this.findOne({username});
}


const User = mongoose.model('User', UserSchema);
export default User;