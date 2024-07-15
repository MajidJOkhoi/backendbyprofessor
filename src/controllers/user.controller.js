const { asyncHandler } = require("../utils/asyncHandler");
const  ApiError  = require("../utils/errorHandler");
const  User  = require("../models/user.models"); 
const ApiResponse  = require("../utils/apiResponse");
const uploadOnCloudinary = require("../utils/cloudinary");

const registerUser = asyncHandler(async (req, res) => {
  // Extract data from request body
  const { fullName, username, email, password } = req.body;


  // Validate input data
  if ([username, email, password, fullName].some((field) => !field || field.trim() === "")) {
    throw new ApiError("All fields are required", 400);
  }


  // Check if the user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  

  if (existingUser) {
    throw new ApiError("Username or email already exists", 409);
  }

  // Validate and upload images to Cloudinary
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError("Avatar is required", 400);
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError("Avatar upload failed", 400);
  }

  // Create the user object
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  

  // Remove sensitive information from the response
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError("Something went wrong while registering the user", 500);
  }

  // Send response
  res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "ok" });
});

module.exports = {
  registerUser,
  loginUser,
};
