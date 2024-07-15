const cloudinary = require('cloudinary').v2
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'djtcfxvlr', 
  api_key: '722188816121671', 
  api_secret: 'amdaK6fXDIhRX_LRkauhAkuiXCw' // Click 'View Credentials' below to copy your API secret
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
  fs.unlinkSync(localfilePath);
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
