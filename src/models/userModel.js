import mongoose from "mongoose";

const userSchema = new mongoose.Schema({   
     username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

// Define unique index on the email field
userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;