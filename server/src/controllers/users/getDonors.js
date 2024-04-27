import Donor from "../../models/Donor.js";

const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDonorbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findById(id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json({ donor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDonors, getDonorbyId };
