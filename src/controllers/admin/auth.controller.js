import bcrypt from 'bcryptjs';
import Admin from '../../models/admin.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email,password)

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // 2. Find admin
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    await admin.save();

    // 5. Send OTP email
    // await sendOtpMail(admin.email, otp);

    return res.json({
      data:req.body,
      message: 'OTP sent to registered email'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
