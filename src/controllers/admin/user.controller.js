import admin from "../../models/admin.js";
import mongoose from "mongoose";


// List All users

export const userList = async (req,res)=>{
    try{

        const list = await admin.find({role:'User',isDeleted:false});
         return res.status(200).json({
            status:200,
            message:'User List Fetch Successfully',
            data:list
         })

    }
    catch(err){
        return res.status(500).json({
            error:err.message,
            status:500,
            message:'Server Errror'
        })
    }

} 


//  Status 

export const userStatus =async (req,res)=>{
    try{
        const {id} = req.params;

        const user = await admin.findByIdAndUpdate(id,[{$set:{status:{$cond:[{$eq:["$status","A"]},"D","A"]}}}],
            {new:true,updatePipeline:true}
        )
        if(!user){
            return res.status(400).json({
                status:400,
                message:'User not found'
            });
        }
        return res.status(200).json({
            status:200,
            message:'User Status Update Successfully'
        });
    }
    catch(err){
        return res.status(500).json({
            error:err.message,
            status:500,
            message:'Internal Error'
        })
    }
}

export const userDelete =async (req,res)=>{
   try{
    const {id}= req.params;
    const deleteUser  = await admin.updateOne({_id:id,isDeleted:false},{
        $set:{isDeleted:true,deletedAt: new Date()}
    })
    if(deleteUser.modifiedCount == 0){
        return res.status(400).json({
            status:400,
            message:'Already User Deleted',
        })
    }
    return res.status(200).json({
        status:200,
        message:'User Delete Successfully'
    })
   }
   catch(err){
    return res.status(500).json({
        status:500,
        message:'Server Error',
        error:err
    })
   }
}