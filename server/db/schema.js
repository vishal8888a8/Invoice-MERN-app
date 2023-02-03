const mongoose = require("mongoose");
const data = require("./data");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/newProduct").then(() => {
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
