const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {


    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    });

     //creating a token
    sendToken(user, 201, res);
    
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email: email }).select("+password");//we have to find using both email and password....becoz we have done select:false in userSchema thats why here we have to write select like this

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //if password matches then create a token
    sendToken(user, 200, res);


});



//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expire: new Date(Date.now()),
        httpOnly: true
    });
    

    res.status(200).json({
        sucess: true,
        message: "Logged Out"
    });
});
