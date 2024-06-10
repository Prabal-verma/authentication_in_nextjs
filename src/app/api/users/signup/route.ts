import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })


        await newUser.save().then(() => {
            console.log("User created successfully");
        }).catch((error:any) => {   
            console.log("User creation failed",error.message);
        });
        
        console.log(newUser);

        //send verification email

        sendEmail({email, emailType: "VERIFY", userId: newUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}