
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
    },
    discount:{
        type:Number
    },
    image:
        [String]
    ,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
    },
    status:{
      type:String,
      enum:['A','D'],
      default:'A'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId ,ref:'Admin'
    }
},{timestamps:true});

export default mongoose.model('Product',productSchema)