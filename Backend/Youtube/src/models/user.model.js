import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
     username:{
        type: String,
        required: [true, "username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
     },
     email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
     },
     fullName:{
        type: String,
        required: [true, "fullname is required"],
        trim: true,
        index: true
     },
     avatar:{
        type: String,   //cloudinary url
        required: [true, "avatar is required"],
     },
     coverImage:{
        type: String,   //cloudinary url
     },
     watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required: [true, "password is required"],
    },
    refreshToken:{
        type: String,
    }
    }, {timestamps: true})

userSchema.pre("save",  async function(next){
   if(!this.isModified("password")) return next();
   
   this.password = await bcrypt.hash(this.password, 10)
   next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
   return  jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this.username,
         fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}

userSchema.methods.generateRefreshToken = async function(){
   return  jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}

/*
   Access Token - Short lived, not stored in db
   Refresh Token - Long lived, stored in db
   When access token expires, the frontend sends the refresh token to the backend to validate user (login), once again.
*/

export const User = mongoose.model("User", userSchema) 