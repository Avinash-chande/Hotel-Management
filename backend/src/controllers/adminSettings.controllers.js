import AdminSettings from "../models/setting.model.js";

/**
 * GET settings (for settings modal + home page)
 */

export const getAdminSettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();

    if (!settings) {
      settings = await AdminSettings.create({
        hotelName: "Hotel Dharmraj",
        adminName: "Admin",
        adminEmail: "admin@gmail.com",
        adminMobile: "0000000000",
        adminAvatar: "",
        isOpen: true
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

/**
 * UPDATE settings (SAVE button)
 */
export const updateAdminSettings = async (req, res) => {
  try {
    const {
      hotelName,
      adminName,
      adminEmail,
      adminMobile,
      adminAvatar,
      isOpen
    } = req.body;

    const updatedSettings = await AdminSettings.findOneAndUpdate(
      {},
      {
        hotelName,
        adminName,
        adminEmail,
        adminMobile,
        adminAvatar,
        isOpen
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Settings updated successfully",
      data: updatedSettings
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings" });
  }
  
};
