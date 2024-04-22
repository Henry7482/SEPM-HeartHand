import Organization from "../../models/Organization.js";

const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findByIdAndDelete(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default deleteOrganization;
