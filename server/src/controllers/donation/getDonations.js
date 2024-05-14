import Donation from "../../models/Donation.js";
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDonationByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const donation
     = await Donation.find({ donor_id: id });
    if (!donation) {
      return res.status(404).json({ message: "User has not make a donation" });
    }
    res.status(200).json(donation );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDonations, getDonationByUserId};