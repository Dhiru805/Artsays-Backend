// Career Update
const mongoose = require("mongoose");
const Career = require("../../../Models/Career");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jobTitle,
      department,
      category,
      workMode,
      location,
      summary,
      rolesResponsibilities,
      requiredSkills,
      preferredSkills,
      experienceLevel,
      education,
      salaryRange,
      deadline,
      publishDate,
      status,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid career ID is required.",
      });
    }

    const errors = [];
    if (!jobTitle) errors.push("Job title is required.");
    if (!department) errors.push("Department is required.");
    if (!["Full-time", "Part-time", "Internship", "Contract", "Freelance"].includes(category)) {
      errors.push(`Invalid job category: ${category}.`);
    }
    if (!["On-site", "Remote", "Hybrid"].includes(workMode)) {
      errors.push(`Invalid work mode: ${workMode}.`);
    }
    if (workMode !== "Remote" && !location) errors.push("Location is required for non-remote jobs.");
    if (!summary) errors.push("Job summary is required.");
    if (!rolesResponsibilities) errors.push("Roles and responsibilities are required.");
    if (!requiredSkills || !Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      errors.push("At least one required skill is needed.");
    }
    if (!preferredSkills || !Array.isArray(preferredSkills) || preferredSkills.length === 0) {
      errors.push("At least one preferred skill is needed.");
    }
    if (!experienceLevel) errors.push("Experience level is required.");
    if (!education || !Array.isArray(education) || education.length === 0) {
      errors.push("At least one education requirement is needed.");
    }
    if (!deadline) errors.push("Application deadline is required.");
    if (!publishDate) errors.push("Publish date is required.");
    if (!["Open", "Closed", "Draft", "Paused"].includes(status)) {
      errors.push(`Invalid status: ${status}.`);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const career = await Career.findByIdAndUpdate(
      id,
      {
        jobTitle,
        department,
        category,
        workMode,
        location: workMode === "Remote" && !location ? "Remote" : location,
        summary,
        rolesResponsibilities,
        requiredSkills,
        preferredSkills,
        experienceLevel,
        education,
        salaryRange,
        deadline,
        publishDate,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!career) {
      return res.status(404).json({
        hasError: true,
        message: `Career with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Career updated successfully.",
      data: career,
    });
  } catch (error) {
    console.error("Error updating career:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A career with the same job title and department already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update career.",
      error: error.message,
    });
  }
};

module.exports = update;