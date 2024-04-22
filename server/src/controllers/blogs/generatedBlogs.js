import GeneratedBlog from '../../models/GeneratedBlog.js'

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
        const rawBlogs = req.body;
        const newGeneratedBlogs = new GeneratedBlog({
            title: rawBlogs.title,
            shortform: rawBlogs.shortform,
            content: rawBlogs.content,
            date: new Date(),
            keywords: rawBlogs.keywords,
            references: rawBlogs.references,
          });
        await newGeneratedBlogs.save();
 
        res.status(201).json(newGeneratedBlogs);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export {getGeneratedBlogs, uploadGeneratedBlogs}
