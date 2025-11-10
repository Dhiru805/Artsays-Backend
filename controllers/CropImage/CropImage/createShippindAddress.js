
// module.exports = createShippingAddress;

const mongoose = require("mongoose");
const Address = require("../../../Models/Address");
const User = require("../../../Models/usermode");

const createAddress = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateAddress = (entry) => {
      const errors = [];

      if (!entry.userId || !mongoose.Types.ObjectId.isValid(entry.userId)) {
        errors.push("Valid user ID is required.");
      }

      if (!entry.addressLine1 || entry.addressLine1.trim() === "") {
        errors.push("Address Line 1 is required.");
      }

      if (!entry.city || entry.city.trim() === "") {
        errors.push("City is required.");
      }

      if (!entry.state || entry.state.trim() === "") {
        errors.push("State is required.");
      }

      if (!entry.country || entry.country.trim() === "") {
        errors.push("Country is required.");
      }

      if (!entry.pincode || entry.pincode.trim() === "") {
        errors.push("Pincode is required.");
      }

      if (entry.pincode && !/^\d{6}$/.test(entry.pincode.trim())) {
        errors.push("Pincode must be a 6-digit number.");
      }

      return errors;
    };

    for (const entry of data) {
      const errors = validateAddress(entry);
      if (errors.length > 0) {
        return res.status(400).json({
          hasError: true,
          message: errors.join(", "),
        });
      }
    }

    const createdAddresses = [];

    for (const entry of data) {
      const {
        userId,
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        country,
        pincode
      } = entry;

      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(400).json({
          hasError: true,
          message: `The specified user (ID: ${userId}) does not exist.`,
        });
      }

      const newAddress = new Address({
        userId,
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2 ? addressLine2.trim() : undefined,
        landmark: landmark ? landmark.trim() : undefined,
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        pincode: pincode.trim()
      });

      await newAddress.save();
      createdAddresses.push(newAddress);
    }

    return res.status(201).json({
      hasError: false,
      message: `Address(es) created successfully. ${createdAddresses.length} record(s) created.`,
      data: createdAddresses,
    });

  } catch (error) {
    console.error("Error creating address:", error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        hasError: true,
        message: "Validation failed: " + validationErrors.join(", "),
      });
    }

    return res.status(500).json({
      hasError: true,
      message: "Failed to create address.",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

module.exports = createAddress;