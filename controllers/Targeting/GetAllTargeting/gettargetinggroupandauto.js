const AutoTargetingSetting = require("../../../Models/AutoTargeting");
const GroupTargetingSetting = require("../../../Models/GroupTargeting");

const getallgroupandautotargeting = async (req, res) => {
  try {
    const { subCategoryIds } = req.params; 
    console.log("Received subCategoryIds:", subCategoryIds);


    const subCategoryIdArray = subCategoryIds ? subCategoryIds.split(",").filter(id => id.trim() !== "") : [];

    if (!Array.isArray(subCategoryIdArray) || subCategoryIdArray.length === 0) {
      return res.status(400).json({ message: "subCategoryIds must be a non-empty array" });
    }

  
    if (subCategoryIdArray.some(id => !id.match(/^[0-9a-fA-F]{24}$/))) {
      return res.status(400).json({ message: "One or more invalid subCategoryId formats" });
    }


    const autoSettings = await AutoTargetingSetting.find({ subCategoryId: { $in: subCategoryIdArray } });

    if (!autoSettings || autoSettings.length === 0) {
      return res.status(404).json({ message: "No targeting settings found for the provided subcategories" });
    }

    const totalAutoSettings = autoSettings.length;
    const sumMinRange = autoSettings.reduce((sum, setting) => sum + setting.minRange, 0);
    const sumMaxRange = autoSettings.reduce((sum, setting) => sum + setting.maxRange, 0);

    const avgMinRange = Number((sumMinRange / totalAutoSettings).toFixed(2));
    const avgMaxRange = Number((sumMaxRange / totalAutoSettings).toFixed(2));
    const defaultBid = Number(((avgMinRange + avgMaxRange) / 2).toFixed(2));


    const groupSettings = await GroupTargetingSetting.find({ subCategoryId: { $in: subCategoryIdArray } });

    if (!groupSettings || groupSettings.length === 0) {
      return res.status(404).json({ message: "No group targeting settings found for the provided subcategories" });
    }

    
    const totalGroupSettings = groupSettings.length;
    const avgGroupRanges = {
      closeMatch: {
        minRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.closeMatch?.minRange || 0), 0) / totalGroupSettings).toFixed(2)),
        maxRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.closeMatch?.maxRange || 0), 0) / totalGroupSettings).toFixed(2)),
      },
      looseMatch: {
        minRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.looseMatch?.minRange || 0), 0) / totalGroupSettings).toFixed(2)),
        maxRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.looseMatch?.maxRange || 0), 0) / totalGroupSettings).toFixed(2)),
      },
      substitutes: {
        minRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.substitutes?.minRange || 0), 0) / totalGroupSettings).toFixed(2)),
        maxRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.substitutes?.maxRange || 0), 0) / totalGroupSettings).toFixed(2)),
      },
      complements: {
        minRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.complements?.minRange || 0), 0) / totalGroupSettings).toFixed(2)),
        maxRange: Number((groupSettings.reduce((sum, setting) => sum + (setting.complements?.maxRange || 0), 0) / totalGroupSettings).toFixed(2)),
      },
    };


    const response = {
      defaultBid: {
        bid: defaultBid,
        range: {
          min: avgMinRange,
          max: avgMaxRange,
        },
      },
      targetingGroups: {
        closeMatch: {
          bid: Number(((avgGroupRanges.closeMatch.minRange + avgGroupRanges.closeMatch.maxRange) / 2).toFixed(2)),
          range: avgGroupRanges.closeMatch,
        },
        looseMatch: {
          bid: Number(((avgGroupRanges.looseMatch.minRange + avgGroupRanges.looseMatch.maxRange) / 2).toFixed(2)),
          range: avgGroupRanges.looseMatch,
        },
        substitutes: {
          bid: Number(((avgGroupRanges.substitutes.minRange + avgGroupRanges.substitutes.maxRange) / 2).toFixed(2)),
          range: avgGroupRanges.substitutes,
        },
        complements: {
          bid: Number(((avgGroupRanges.complements.minRange + avgGroupRanges.complements.maxRange) / 2).toFixed(2)),
          range: avgGroupRanges.complements,
        },
      },
    };

    res.status(200).json({
      message: "Average targeting settings fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching average targeting settings:", error);
    res.status(500).json({ message: "Server error while fetching targeting settings" });
  }
};

module.exports = getallgroupandautotargeting;