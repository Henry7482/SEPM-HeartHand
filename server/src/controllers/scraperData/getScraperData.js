import ScraperData from "../../models/ScaperData.js";

const getScraperData = async (req, res) => {
  try {
    const blogs = await ScraperData.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getLatestScraperData = async (req, res) => {
  try {
    const blogs = await ScraperData.find().sort({ _id: -1 }).limit(1);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getScraperData, getLatestScraperData };
