import {getBlogs, getBlogbyId} from "./blogs/getBlogs.js";
import createBlog from "./blogs/createBlog.js";
import updateBlog from './blogs/updateBlog.js';
import deleteBlog from './blogs/deleteBlog.js';
import {getGeneratedBlogs, uploadGeneratedBlogs} from './blogs/generatedBlogs.js';


export { getBlogs , createBlog, getBlogbyId, updateBlog, deleteBlog, getGeneratedBlogs, uploadGeneratedBlogs} 