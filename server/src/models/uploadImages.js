// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
// const path = require('path');

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Function to upload image to Cloudinary
// function uploadImage(filePath) {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(filePath, (error, result) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }

// // Function to read files from a directory recursively
// function readFilesFromDir(dir) {
//     return fs.readdirSync(dir).map(file => path.join(dir, file));
// }

// // Path to the "image" folder
// // const imageFolderPath = '../images';
// const imageFolderPath = path.join(__dirname, 'images');

// // Upload images from the "image" folder
// const imageFiles = readFilesFromDir(imageFolderPath);
// imageFiles.forEach(async imagePath => {
//     try {
//         const result = await uploadImage(imagePath);
//         console.log('Image uploaded successfully:', result.url);
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// });

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload image to Cloudinary
async function uploadImage(filePath) {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        console.log('Image uploaded successfully:', result.url);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Function to read files from a directory recursively
function readFilesFromDir(dir) {
    return fs.readdirSync(dir).map(file => join(dir, file));
}

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the "image" folder relative to the script's location
const imageFolderPath = join(__dirname, 'images');

// Upload images from the "image" folder
const imageFiles = readFilesFromDir(imageFolderPath);
imageFiles.forEach(uploadImage);
