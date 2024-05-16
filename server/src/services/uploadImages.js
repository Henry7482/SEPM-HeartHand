import cloudinary from '../configs/cloudinary.js';
import multer from 'multer';

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'hearthand', // Optional: specify a folder in Cloudinary
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error);
        } else {
          console.log('Image uploaded successfully:', result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    stream.end(fileBuffer);
  });
};

export { upload, uploadImageToCloudinary };
