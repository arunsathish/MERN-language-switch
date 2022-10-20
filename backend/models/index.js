const ProductSchema = require("./product");

module.exports = (db) => {
  // db here represents the connection object that will come from our connection file
  db.model("Product", ProductSchema);
  // Other file in our schema
  // db.model("model", modelSchema)

  return db;
};
