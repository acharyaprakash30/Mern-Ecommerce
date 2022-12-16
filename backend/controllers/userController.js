const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require('cloudinary');
//Register a new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log("surprizeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",req.body.avatar.tempFilePath)
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar.tempFilePath, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});
//Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
//LogOut
exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
//for user forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `your password reset token in :- \n\n ${resetPasswordUrl} if you have not request this then please ignore it`;
  try {
    sendEmail({
      email: user.email,
      subject: "ecommerce password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

//for reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password doesnot password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("old password is incorrect", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password doesnot password", 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//update user profile email and name
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModifiers: false,
  });

  res.status(200).json({
    success: true,
  });
});

//admin-get all the users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});

//get the specific login user data
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHander(`user doesnot exit with id ${req.params.id}`, 401)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  };

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModifiers: false,
  });

  res.status(200).json({
    success: true,
  });
});

//delete user
exports.deleteUser = catchAsyncErrors(async (req, res,next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHander(`user doesnot exit with id ${req.params.id}`, 401)
    );
  }
  await user.remove();
  res.status(200).json({
    success: "true",
    message: "user deleted sucessfully",
  });
});
