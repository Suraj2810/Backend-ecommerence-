import Product from "../../models/Product.js";

export const addproduct =async(req,res)=>{
    try{
        const {name , description,price}=req.body;

        if(!name && !price){
            return res.status(400).json({message:'Product Name and Price is required',status:400});
        }
         if(!name){
            return res.status(400).json({message:'Product Name is required',status:400});
        }
         if(!price){
            return res.status(400).json({message:'Price is required',status:400});
        }

       const product = await Product.create({
        name,
        description,
        price,
        createdBy:req.user.id
       });
       console.log(product)
       
       return res.status(201).json({
        message:'Product created Successfully',
        status:201,
        data:product
       });

    }
    catch(err){
        console.error('Add product error:', err);
        return res.status(500).json({message:'Server Error',status:500,error:err})
    };
}

export const productList = async(req,res)=>{
    try{
        const list = await Product.find({status:'A'});
        return res.status(200).json({
            message:'list Successfully',
            data:list,
            status:200
        });
    }
    catch(err){
        return res.status(500).json({
            message:'Server error',
            status:500,
            error:err
        })
    }
}


export const deleteProduct = async(req,res)=>{
    try{
       const deleteQuery = await Product.findByIdAndDelete(req.params.id);
           console.log('req',req.params.id)
       console.log('deleteQuery',deleteQuery)
       console.log(product)
      if(!deleteQuery){
        return res.return(400).json({
            status:400,
            message:'Product Not Found'
        })
      };
        return res.status(200).json({
            status:200,
            message:'Product Delete Successfully',
            data:deleteQuery

        });

    }
    catch(err){
        return res.status(500).json({
            status:500,message:'Server Error',error:err
        })
    }
}