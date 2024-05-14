import GeneratedBlogs from '../../models/GeneratedBlogs.js'

const getGeneratedBlogs = async (req, res) => {
    try {
        const generatedBlogs = await GeneratedBlogs.find();
        res.status(200).json(generatedBlogs);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getGeneratedBlogsById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the generated blog by its ID
    const blog = await Blog.findById(id);
    if (!blog) {
      // If blog is not found, return a 404 response
      return res.status(404).json({ message: "Generated blog not found" });
    }
    // If blog is found, return it in the response
    res.status(200).json(blog);
  } catch (error) {
    // If an error occurs, return a 500 response with the error message
    res.status(500).json({ message: error.message });
  }
};

const uploadGeneratedBlogs = async (req, res) => {
    try {
        const rawBlogsObject = req.body;
        if (!rawBlogsObject || typeof rawBlogsObject !== "object") {
          return res.status(400).json({ message: "Input is not a valid JSON object" });
        }

        await GeneratedBlogs.create(rawBlogsObject);
 
        res.status(201).json({message: "Generated blogs uploaded successfully", rawBlogsObject});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export {getGeneratedBlogs, getGeneratedBlogsById, uploadGeneratedBlogs}
