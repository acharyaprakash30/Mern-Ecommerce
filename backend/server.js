const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connect to database 
connectDatabase()


const server = app.listen(process.env.PORT,()=>{
  console.log(`server is running on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});