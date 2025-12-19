
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