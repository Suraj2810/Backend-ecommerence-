import mongoose from "mongoose";
import category from "../../models/category.js";

// add category

export const addCategory = async(req,res)=>{
    try{
       const {name,parentId} = req.body;
       if(!name){
        return res.status(400).json({
            status:400,
            message:'Category Name is required'
        })
       }

       const categoryAdd = await category.create({
        name,
        parentId,
        createdBy:req.user.id
       });

       return res.status(200).json({
        status:200,
        message:'Category Added Successfully',
        data:categoryAdd
       })

    }
    catch(err){
        return res.status(500).json({
            error:err.message,
            status:500,
            message:'Internal Server Error'
        })
    }
}

// update category 

export const updateCategory =async (req,res)=>{
    try{
        const {id}=req.params;
        const updateData = req.body;
        const categoryUpdate = await category.findByIdAndUpdate(id,updateData,{new:true});
        if(!categoryUpdate){
            return res.status(400).json({
                status:400,
                message:'Invalid Category'
            })
        }
        return res.status(200).json({
            status:200,
            message:'Category Update Successfully',
        })
    }
    catch(err){
        return res.status(500).json({
            error:err.message,
            status:500,
            message:'Server Error'
        })
    }
}

// list category

export const listCategory =async (req,res)=>{
    try{
        const listData = await category.find();
        return res.status(200).json({
            status:200,
            message:'List Successfully',
            data:listData
        })
    }
    catch(err){
        return res.status(500).json({
            error:err.message,
            status:500,
            message:'Server Error'
        })
    }
}


export const deleteCategory = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status.json({
                status:403,
                message:'Category Already Deleted'
            })
        }
        const deleteData = await category.findByIdAndDelete(id);
        return res.status(200).json({
            status:200,
            messsage:'Category Deleted Succesfully'
        })
    }
    catch(err){
        return res.status(500).json({
            error:err.message,
            status:500,
            message:'Server Error'
        })
    }
}

// status 

export const statusCategory = async (req,res)=>{
    try{
        const {id}= req.params;
        const updateStatus = await category.findByIdAndUpdate(id,[{$set:{status:{$cond:[{$eq:['$status','A']},'D','A']}}}],
            {new:true,updatePipeline:true}
        );

        if(!updateStatus){
            return res.status(400).json({
                status:400,
                message:'Invalid Category Id'
            })
        }
        return res.status(200).json({
            status:200,
            message:'Category Status Successfully'
        })
    }
    catch(err){
        return res.status(500).json({
            status:500,
            error:err.message,
            message:'Server Error',

        })
    }
}

export const subCategory =async(req,res)=>{
    try{
        const {id}=req.params;
        const  subCategoryData = await category.find({parentId:id});

        return res.status(200).json({
            status:200,
            message:'Successfully List',
            data:subCategoryData
        })
    }
    catch(err){
        return res.status(500).json({
            status:500,
            error:err.message,
            message:'Server Error'
        })
    }
}