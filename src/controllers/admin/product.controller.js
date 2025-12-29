import Product from "../../models/Product.js";
import Category from "../../models/category.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      stock,
      categoryId
    } = req.body;

    // 🔹 Validate category
    const categoryExists = await Category.findOne({
      _id: categoryId,
      status: "A",
    });

    if (!categoryExists) {
      return res.status(400).json({
        message: "Invalid or inactive category"
      });
    }

    // 🔹 Get image paths
    const images = req.files?.map(file => file.path) || [];

    const product = await Product.create({
      name,
      description,
      price,
      discount,
      stock,
      images,
      categoryId,
      createdBy: req.user.id   // logged-in admin
    });

    res.status(201).json({
      message: "Product added successfully",
      data: product
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};


// GET: Product List
export const productList = async(req,res)=>{
    try{
        const list = await Product.find();
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

// PUT: Update Product

export const updateProduct = async(req,res)=>{
  try{
  const {id} = req.params;
  const updatedData = req.body;

  const updated = await Product.findByIdAndUpdate(id,updatedData,{new:true});
  if(!updated){
    return res.status(403).json({
      message :"InValid Id ",
      status:403,
    })
  }
  return res.status(200).json({
    message:'Updated Successfully',
    status:200,

  })
  }
  catch(err){
    return res.status(500).json({
      message:'Server Error',
      error:err.message,
      status:500
    })
  }
  

}


export const updateStatusProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find product by ID
    // const product = await Product.findById(id);

    const product = await Product.findByIdAndUpdate(id,[{$set:{status:{$cond:[{$eq:["$status","A"]} ,"D","A"]}}}],
     {new:true,updatePipeline:true}
    );

//     const product = await Product.findByIdAndUpdate(
//   id,
//   [{ $set: { status: { $cond: [{ $eq: ["$status", "A"] }, "D", "A"] } } }],
//   { new: true }
// );


    // 2️⃣ If product not found
    if (!product) {
      return res.status(400).json({
        message: 'Invalid ProductId',
        status: 400
      });
    }

    // // 3️⃣ Toggle status
    // product.status = product.status === 'A' ? 'D' : 'A';

    // // 4️⃣ Save updated product
    // await product.save();

    return res.status(200).json({
      message: 'Status Updated Successfully',
      status: 200,
      data: {
        status: product.status,
        name: product.name
      }
    });

  } catch (err) {
    return res.status(500).json({
      message: 'Server Error',
      status: 500,
      error: err.message
    });
  }
};


// DELETE: Delete Product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 

    // 1. Check if the decrypted ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // 2. Attempt to find and delete
    const deletedProduct = await Product.findByIdAndDelete(id);

    // 3. Handle the case where product was already deleted or doesn't exist
    if (!deletedProduct) {
      return res.status(404).json({ 
        message: "Product not found or already deleted" 
      });
    }

    // 4. Success
    return res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("Delete Error:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

