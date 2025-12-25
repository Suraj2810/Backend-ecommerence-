import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        refer:'category',
        default:null
    },
    status:{
        type:String,
        enum:["A","D"],
        default:"A"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        refer:'admin',
        default:null
    },

}
,{timeStamps:true},);

categorySchema.index(
    {name:1,parentId:1},{unique:true}
)

export default mongoose.model("category",categorySchema);