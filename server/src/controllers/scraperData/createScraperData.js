import ScraperData from "../../models/ScaperData.js";

const createScraperData = async (req, res) => {
  try {
    const scraperData = req.body;
    if (!scraperData || typeof scraperData !== "object") {
      return res.status(400).json({ message: "Input is not a valid JSON object" });
    }

    await ScraperData.create(scraperData);
    res.status(200).json({ message: "Scraper data created successfully",  scraperData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createScraperData;
