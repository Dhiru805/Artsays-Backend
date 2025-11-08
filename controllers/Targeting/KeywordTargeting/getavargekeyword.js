const KeywordTargetingSetting = require("../../../Models/KeywordTargeting");

const getKeywordTargetingSummaryGroupedByKeyword = async (req, res) => {
  try {
    const { subCategoryIds } = req.params;

    const subCategoryIdArray = subCategoryIds
      ? subCategoryIds.split(",").filter((id) => id.trim() !== "")
      : [];

    if (!Array.isArray(subCategoryIdArray) || subCategoryIdArray.length === 0) {
      return res.status(400).json({ message: "subCategoryIds must be a non-empty array" });
    }

    if (subCategoryIdArray.some((id) => !id.match(/^[0-9a-fA-F]{24}$/))) {
      return res.status(400).json({ message: "One or more invalid subCategoryId formats" });
    }

    const keywordSettings = await KeywordTargetingSetting.find({
      subCategoryId: { $in: subCategoryIdArray },
    });

    if (!keywordSettings || keywordSettings.length === 0) {
      return res.status(404).json({ message: "No keyword targeting settings found" });
    }

    const groupedByKeyword = {};

    keywordSettings.forEach((setting) => {
      const keyword = setting.keyword.trim();

      if (!groupedByKeyword[keyword]) {
        groupedByKeyword[keyword] = {
          broad: [],
          phrase: [],
          exact: [],
        };
      }

      if (setting.broad) groupedByKeyword[keyword].broad.push(setting.broad.range);
      if (setting.phrase) groupedByKeyword[keyword].phrase.push(setting.phrase.range);
      if (setting.exact) groupedByKeyword[keyword].exact.push(setting.exact.range);
    });

    const keywordTargeting = {};

    for (const [keyword, types] of Object.entries(groupedByKeyword)) {
      const avg = (arr) => {
        if (arr.length === 0) return { minRange: 0, maxRange: 0, bid: 0 };
        const avgVal = arr.reduce((sum, val) => sum + val, 0) / arr.length;
        const rounded = Number(avgVal.toFixed(2));
        return {
          minRange: rounded,
          maxRange: rounded,
          bid: rounded,
        };
      };

      keywordTargeting[keyword] = {
        broad: {
          bid: avg(types.broad).bid,
        //   range: {
        //     minRange: avg(types.broad).minRange,
        //     maxRange: avg(types.broad).maxRange,
        //   },
        },
        phrase: {
          bid: avg(types.phrase).bid,
        //   range: {
        //     minRange: avg(types.phrase).minRange,
        //     maxRange: avg(types.phrase).maxRange,
        //   },
        },
        exact: {
          bid: avg(types.exact).bid,
        //   range: {
        //     minRange: avg(types.exact).minRange,
        //     maxRange: avg(types.exact).maxRange,
        //   },
        },
      };
    }

    res.status(200).json({
      message: "Keyword targeting summary grouped by keyword fetched successfully",
      data: {
        keywordTargeting,
      },
    });
  } catch (error) {
    console.error("Error fetching keyword targeting:", error);
    res.status(500).json({ message: "Server error while fetching keyword targeting settings" });
  }
};

module.exports = getKeywordTargetingSummaryGroupedByKeyword;
