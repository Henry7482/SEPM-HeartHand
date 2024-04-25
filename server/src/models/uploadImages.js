const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

async function uploadImagesToCloudinary(folderPath) {
    const files = await readImageFilesFromFolder(folderPath);
    const imageUrls = [];
    for (const file of files) {
        const result = await cloudinary.uploader.upload("../server/images");
        imageUrls.push(result.secure_url);
    }
    return imageUrls;
}

module.exports = uploadImagesToCloudinary;
