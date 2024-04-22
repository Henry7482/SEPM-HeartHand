import Blog from "../../models/Blog.js";

const newBlogInstance = async () => {
  const keywords = ["test", "blog"];
  const references = ["test", "blog"];
  const imageURL = null;
  const defaultImageURL = "https://www.defaultURL.com";
  // Recieve raw blogs;
  const rawBlogs = {
    title: "Sample Blog",
    shortform:
      "Vietnam is currently facing a severe COVID-19 outbreak, with the virus claiming the lives of over 10 people in Hanoi alone. Families across the country are devastated by the loss of their loved ones, and the situation is dire.",
    content:
      "The government has implemented strict lockdown measures to curb the spread of the virus, but the situation remains grim. The people of Vietnam are in desperate need of help, and the international community must come together to support them in this difficult time.",
    keywords,
    references,
    imageURL,
  };

  const blog = new Blog({
    title: rawBlogs.title,
    shortform: rawBlogs.shortform,
    content: rawBlogs.content,
    date: new Date(),
    keywords: rawBlogs.keywords,
    references: rawBlogs.references,
    imageURL: defaultImageURL,
  });
  return blog;
};

const createBlog = async (req, res) => {
  try {
    const blog = await newBlogInstance();
    const output = await Blog.create(blog);
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createBlog;
