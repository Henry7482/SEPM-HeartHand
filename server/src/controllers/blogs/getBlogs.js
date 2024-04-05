import Blog from '../../models/Blogs.js';
const getBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
}

export default getBlogs;