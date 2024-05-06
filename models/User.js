const mongoose = require ('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    user_id:{
        type: String,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true
    },
    phoneNo:{
     type: Number,
     required:true,
     unique:true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    DOB:{
        type:Date
    },
    Pro_image:{
        type:String
    },
    date:{
        type: Date,
        default:Date.now 
    },
    // otp:{
    //     type:String
    // },
//     Permissions: [{
//       Permission: {
//           type: String,
//           default: null
//       },
//       Status: {
//           type: Boolean,
//           default: false
//       }
//   }],
  });
const User = mongoose.model('user', UserSchema);
module.exports = User;
  