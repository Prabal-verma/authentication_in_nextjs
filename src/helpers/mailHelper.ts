import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import { use } from 'react';

export const sendMail = async ({email,emailType, userID}:any) =>{
  try {

    //TODO: configure mail for usage

    const hashedToken = await bcryptjs.hash(userID.toString(), 10)

    if(emailType === 'VERIFY'){
      await User.findByIdAndUpdate(userID, {verifyToken: hashedToken, verifyexpires: Date.now() + 3600000})

    }else if(emailType === 'RESET'){
      await User.findByIdAndUpdate(userID, {forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000})
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!
      }
    });


    const mailOptions = {
      from: '"poxypixel@gmail.com',
      to: email,
      subject: emailType === 'VERIFFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse;
    
  } catch (error:any) {
    throw new Error(error.message);
  }
}