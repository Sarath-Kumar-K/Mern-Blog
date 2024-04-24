import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      reqired: true,
      uinque: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture:{
      type:String,
      default:"https://static.vecteezy.com/system/resources/thumbnails/020/911/732/small_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user',userSchema); // here user in model method is the collection name in mongodb just like table name in mysql where in mongodb it automatically apends s to the word user changing into users where u can see it in mongobd database in browser

export default User;
