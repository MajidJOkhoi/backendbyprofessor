const mongoose = require("mongoose"); 
const DB_NAME = require("../contacts"); 

// Asynchronous function to connect to the MongoDB database

const connectDB = async () => {
  try {
    
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`, 
      {
        // useNewUrlParser: true, 
        // useUnifiedTopology: true, 
      }
    );
    // Logging a success message along with the host of the connected instance
    console.log(`Mongoose connected !! DB HOST : ${connectionInstance.connection.host}`);
  } catch (error) {
  
    console.error("Mongodb Connection Error", error);
    process.exit(1); // Exiting the process with failure
  }
};

module.exports = connectDB; 