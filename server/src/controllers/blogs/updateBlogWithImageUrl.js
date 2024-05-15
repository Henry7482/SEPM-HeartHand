// Update blog with new image url
import Blog from "../../models/Blog.js";
const updateBlogWithImageUrl = async (blogId, imageUrl) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, { imageURL: imageUrl }, { new: true });
      return updatedBlog;
    } catch (error) {
      throw new Error('Failed to update blog with image URL');
    }
  };
  export {updateBlogWithImageUrl}; 