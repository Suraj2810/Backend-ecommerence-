// create Admin Function 

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../src/models/admin.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DBURL);

    const email = "surajpundir560@gmail.com";
    const plainPassword = "Abcd12345";

    // check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
      isActive: true
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
