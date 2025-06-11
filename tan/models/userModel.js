import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameEN: { type: String, required: true },
    role: { type: String , enum: ["user" , "house" , "ministry" , "border"] , required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.methods.getAccessToken = function(){
    return jwt.sign(
        { id : this.id , role: this.role , purpose:"access" }, 
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_EXPIRE }
    );
}

userSchema.methods.getRefreshToken = function(){
    return jwt.sign(
        { id : this.id , role: this.role , purpose:"refresh" }, 
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_EXPIRE }
    );
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password , this.password);
};

userSchema.methods.encrypt = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password , salt);
};

const User = mongoose.model("User", userSchema);
export default User;
