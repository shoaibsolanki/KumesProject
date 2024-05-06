const mongoose = require ('mongoose');
const { Schema } = mongoose;

const Productschema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    quantity:{
     type: Number,
     required:true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount_type:{
        enum:["flat", "percentage"]
    }
  } ,{ timestamps: true });
const Product = mongoose.model('Product',Productschema);
module.exports = Product;