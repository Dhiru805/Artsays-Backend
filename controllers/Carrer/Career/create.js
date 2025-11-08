//carrer API
const mongoose = require("mongoose");
const Career = require("../../../Models/Career");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const errors = [];
    const createdCareers = [];

    for (const entry of data) {
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
      } = entry;

      // Validation
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

      const newCareer = new Career({
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
      });

      await newCareer.save();
      createdCareers.push(newCareer);
    }

    return res.status(201).json({
      hasError: false,
      message: "Career(s) created successfully.",
      data: createdCareers,
    });
  } catch (error) {
    console.error("Error creating careers:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A career with the same job title and department already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create careers.",
      error: error.message,
    });
  }
};

module.exports = create;