
import express from "express";

const router = express.Router();


const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};


router.post("/generate-otp", async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber || mobileNumber.length !== 10) {
    return res.status(400).json({ message: "Invalid mobile number" });
  }

  const otp = generateOtp();

  try {
   
    const otpData = { mobileNumber, otp};
    await req.db.collection("otps").insertOne(otpData); 

    
    res.json({ message: "OTP generated successfully", otp });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Error generating OTP" });
  }
});


router.post("/verify-otp", async (req, res) => {
  const { mobileNumber, otp } = req.body;

  try {
   
    const record = await req.db
      .collection("otps")
      .findOne({ mobileNumber, otp });

    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
});

export default router;
