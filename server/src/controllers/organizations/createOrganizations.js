import Organization from "../../models/Organization.js";

const createOrganizations = async (req, res) => {
  try {
    const { name, phone_number, address, email, website, keywords } = req.body;
    const organization = new Organization({
      name,
      phone_number,
      address,
      email,
      website,
      keywords,
      imageURL
    });
    const savedOrganization = await organization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createOrganizations;
