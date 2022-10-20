const mongoose = require("mongoose");
const modelSchema = require("../models");

// One connection for ARABIC language
module.exports = () => {
  const conn = mongoose.createConnection(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_NAME_AR}?retryWrites=true&w=majority`
  );
  return modelSchema(conn);
};
