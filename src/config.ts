import dotenv from 'dotenv';
dotenv.config();

//server configurations
export const PORT = Number(process.env.PORT || 5000);
export const MONGODB_URI = process.env. MONGODB_URI || "";
export const MONGO_DB = process.env. MONGO_DB || "reservationPuppy_db";


// Cloudinary
export const CLOUDINARY_CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME || "";

export const CLOUDINARY_API_KEY =
  process.env.CLOUDINARY_API_KEY || "";

export const CLOUDINARY_API_SECRET =
  process.env.CLOUDINARY_API_SECRET || "";

  //Login
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
