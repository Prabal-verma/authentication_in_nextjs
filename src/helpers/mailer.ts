import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        console.log("1");
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log("2");
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        console.log("3");

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'august72@ethereal.email',
                pass: 'wAGwu9BhjwqYSsNZpT'
            }
        });
          console.log("4");


        const mailOptions = {
            from: 'poxy@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        console.log("5");

        const mailresponse = await transporter.sendMail
        (mailOptions);
        console.log("6");
        return mailresponse;
        

    } catch (error:any) {
        console.log("fuckk");
        throw new Error(error.message);
    }
}