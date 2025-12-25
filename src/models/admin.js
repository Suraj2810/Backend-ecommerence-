import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['ADMIN', 'SUPER_ADMIN','User'],
      default: 'User'
    },

    otp: {
      type: String,
      default: null
    },

    otpExpiry: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum:["A","D"],
      default: "A"
    },
    deletedAt:{
      type:Date,
      default:null
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Admin', adminSchema);
