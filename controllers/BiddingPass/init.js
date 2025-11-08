
const BiddingPass = require('../../Models/BiddingPass');

async function initBiddingPasses() {
  try {
    const defaults = BiddingPass.getDefaultPasses();

    for (const item of defaults) {
      const exists = await BiddingPass.findOne({ name: item.name });

      if (!exists) {
        await BiddingPass.create(item);
        console.log(`Created bidding pass: "${item.name}"`);
      } else {
        console.log(`Bidding pass "${item.name}" already exists, skipping creation`);
      }
    }

    console.log("All default bidding passes initialized successfully");
  } catch (e) {
    console.error("Error initializing bidding passes:", e.message);
  }
}

module.exports = initBiddingPasses;
