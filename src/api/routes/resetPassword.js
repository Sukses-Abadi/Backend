// routes/resetPassword.js
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const prisma = require("../../lib/prisma");
const bcrypt = require(`bcryptjs`);

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");

    // Set token expiration time (e.g., 1 hour)
    const tokenExpiration = new Date(Date.now() + 3600000);

    // Update user with reset token and expiration time
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: tokenExpiration,
      },
    });

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "suksesabadi.apparel.store@gmail.com",
        pass: "vpqk mtov pokk dwih",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "noreply@example.com",
      to: email,
      subject: `Hello ${user.username} ,Password Reset,  Sukses Abadi Apparel Store`,
      text: `Your username is ${user.username} . Please Click the link within 1 hour to reset your password: ${process.env.CLIENT_URL}/auth/reset/${token}`,
    };

    // Send the email
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    return res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user's password and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
