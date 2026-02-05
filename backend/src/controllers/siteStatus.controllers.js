import { SiteStatus } from "../models/siteStatus.model.js"

export const getSiteStatus = async (req, res) => {
    let status = await SiteStatus.findOne();

    // 👇 auto-create if not exists
    if (!status) {
        status = await SiteStatus.create({ siteStatus: "open" });
    }

    res.status(200).json(status);
};


export const updateSiteStatus = async (req, res) => {
    const { siteStatus } = req.body

    const updated = await SiteStatus.findOneAndUpdate(
        {},
        { siteStatus },
        { new: true }
    )

    res.status(200).json(updated)
}
