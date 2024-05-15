import Organization from "../../models/Organization.js";

const updateOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      { ...req.body, logo: req.body.logo }, // Make sure that logo URL is updated
      { new: true }
    );
    if (!updatedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateOrganization;
