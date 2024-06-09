import {connect} from '@/connections/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/helpers/mailHelper'


connect()

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const{username, email, password} = reqBody;
    // validation


    const user = await User.findOne({email})
    if(user){
      return NextResponse.json({error: 'User already exists'}, {status: 400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    }).save()

    console.log(newUser);

    // Send veryfication email


    await sendMail({email, emailType: 'VERIFY', userID: newUser._id})

    return NextResponse.json({message: 'User registered successfully',
      success: true,
      newUser},
      {status: 201})



  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500})
    
  }
}