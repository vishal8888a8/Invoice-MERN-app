const mongoose = require("mongoose");
const data = require("./data");
const { MONGOURI } = require("../../config/keys");

mongoose.set("strictQuery", false);

mongoose.connect(MONGOURI).then(() => {
    console.log("Database connected!");
});

const schema = new mongoose.Schema({
    dsin: String,
    name: String,
    mrp: Number,
    hsn: Number,
    gst: Number,
    discount: Number,
    unit: String,
});

const productCol = new mongoose.model("productCol", schema);

const dataReset = async () => {
    await productCol.deleteMany({});
    productCol.insertMany(data);
};

// dataReset();

module.exports = productCol;
