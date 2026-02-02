import { Setting } from "../models/setting.model.js"

export const toggleHardcodedMenu = async (req, res) => {
  try {
    let setting = await Setting.findOne({ key: "showHardcodedMenu" })

    if (!setting) {
      setting = await Setting.create({
        key: "showHardcodedMenu",
        value: false
      })
    } else {
      setting.value = !setting.value
      await setting.save()
    }

    res.status(200).json({
      message: "Visibility updated",
      value: setting.value
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}
