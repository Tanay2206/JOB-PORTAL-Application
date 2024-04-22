import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

//schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name Is Require']
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:[true, 'Email Is Require'],
        unique:true,
        validate: validator.isEmail,
    },
    password:{
        type:String,
        required: [true, "password is require"],
        minlength: [5, "Password length should be greater than 5 character"],
        select: true,
    },
    location:{
        type:String,
        default: "India",
    },
},
{
    timestamps: true
});

//middlewares
userSchema.pre("save", async function() {
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

//JSON WEBTOKEN
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET, {expiresIn: "1d",});
}
export default mongoose.model('User', userSchema);