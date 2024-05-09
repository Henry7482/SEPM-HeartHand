// Importing the CommonJS module
import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import Blog from '../../models/Blog.js';

const app = express();
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle POST request to upload image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));

        // Store image URL in MongoDB
        const imageUrl = result.secure_url;

        // Update blog with new image URL
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            imageUrl: imageUrl
        });
        await newBlog.save();

        res.json({ message: 'Image uploaded to Cloudinary and blog updated successfully', imageUrl: imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export default app;