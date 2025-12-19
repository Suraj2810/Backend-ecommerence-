import bcrypt from 'bcryptjs';
import Admin from '../../models/admin.js';
import {generateToken} from '../../services/auth.service.js'
import { sendOtpMail } from '../../confiq/mail.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required', status:400 });
    }

    // 2. Find admin
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid credentials',status:401 });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials',status:401 });
    }

    // 4. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpiry = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); 
    await admin.save();

    // 5. Send OTP email
    await sendOtpMail(admin.email, otp);

    return res.json({
      data:req.body,
      message: 'OTP sent to registered email',
      status:200
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error',status:500 });
  }
};



export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const admin = await Admin.findOne({ email });

  if (
    !admin ||
    admin.otp !== otp ||
    admin.otpExpiry < new Date()
  ) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }

  // Clear OTP
  admin.otp = null;
  admin.otpExpiry = null;
  await admin.save();
const token = generateToken({
  id: admin._id,
  role: admin.role
});

  res.json({ message: "OTP verified successfully",
    status:200,
    data:{
      userId:admin.id,
      email:admin.email,
      role:admin.role,
      createdAt:admin.createdAt,
      updatedAt:admin.updatedAt,
      token:token
    }
    
   });
};
