import { v2 as cloudinary } from "cloudinary";
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localfilePath) => {
  try {
    // Check if localfilePath is provided
    if (!localfilePath) {
      console.error("Local file path is missing.");
      return null;
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto", // Automatically detect resource type
    });

    // Log Cloudinary URL of the uploaded file
    console.log("File uploaded successfully to Cloudinary:", response.url);

    // Return Cloudinary response
    return response;
  } catch (error) {
    // Handle upload failure
    console.error("Error uploading file to Cloudinary:", error.message);

    // Remove the local temporary file if it exists
    if (fs.existsSync(localfilePath)) {
      fs.unlinkSync(localfilePath);
      console.log("Local temporary file removed:", localfilePath);
    }

    // Return null indicating failure
    return null;
  }
};

module.exports = uploadOnCloudinary;
