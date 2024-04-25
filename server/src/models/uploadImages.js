const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImagesToCloudinary(folderPath) {
    const files = await readImageFilesFromFolder("../server/images");
    const imageUrls = [];
    for (const file of files) {
        const result = await cloudinary.uploader.upload("../server/images" + file);
        imageUrls.push(result.secure_url);
    }
    return imageUrls;
}

module.exports = uploadImagesToCloudinary;
