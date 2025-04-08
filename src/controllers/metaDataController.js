const Metadata = require('../models/metaData');

// Add or Edit Metadata
exports.addOrEditMetadata = async (req, res) => {
  try {
    const { email, phone, whatsapp, facebook, instagram, tiktok, twitter, linkedin, locationDescription, locationMapLink } = req.body;

    // Check if metadata already exists
    let metadata = await Metadata.findOne();

    // If metadata does not exist, create new one
    if (!metadata) {
      metadata = new Metadata({
        email,
        phone,
        whatsapp,
        facebook,
        instagram,
        tiktok,
        twitter,
        linkedin,
        locationDescription,
        locationMapLink,
      });
      await metadata.save();
      return res.status(201).json({ message: 'Metadata created successfully', metadata });
    }

    // If metadata exists, update it
    metadata.email = email || metadata.email;
    metadata.phone = phone || metadata.phone;
    metadata.whatsapp = whatsapp || metadata.whatsapp;
    metadata.facebook = facebook || metadata.facebook;
    metadata.instagram = instagram || metadata.instagram;
    metadata.tiktok = tiktok || metadata.tiktok;
    metadata.twitter = twitter || metadata.twitter;
    metadata.linkedin = linkedin || metadata.linkedin;
    metadata.locationDescription = locationDescription || metadata.locationDescription;
    metadata.locationMapLink = locationMapLink || metadata.locationMapLink;

    await metadata.save();
    res.status(200).json({ message: 'Metadata updated successfully', metadata });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve metadata
exports.getMetadata = async (req, res) => {
  try {
    const metadata = await Metadata.findOne();
    if (!metadata) return res.status(404).json({ message: 'Metadata not found' });

    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
