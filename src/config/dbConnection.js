import mongoose from 'mongoose';
export const dbConnect = async()=>{
    try{
        const connect =await mongoose.connect(process.env.DBURL);
        console.log(`DB connect Successfully${connect}`);
    }
    catch(error){
        console.log('While Error Connection to db', error);
        process.exit(1);

    }
}

