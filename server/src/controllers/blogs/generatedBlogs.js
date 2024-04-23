import GeneratedBlogs from '../../models/GeneratedBlogs.js'

const getGeneratedBlogs = async (req, res) => {
    try {
        const generatedBlogs = await GeneratedBlog.find();
        res.status(200).json(generatedBlogs);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

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

export {getGeneratedBlogs, uploadGeneratedBlogs}
