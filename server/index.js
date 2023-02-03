const express = require("express");
const cors = require("cors");
const path = require("path");
const productCol = require("./db/schema");
const { printPdf } = require("./helpers/converter");
const { ProductsData } = require("./helpers/ProductsData");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/products", async (req, res) => {
    try {
        let data = await productCol.find({});
        res.send(data);
    } catch (err) {
        res.sendStatus(400);
    }
});

app.post("/api/products", async (req, res) => {
    try {
        let data = req.body;
        if (data.length === 0) res.sendStatus(400);
        else {
            let parameter = await ProductsData(data);
            printPdf(parameter, () =>
                res.sendFile(path.join(__dirname, "invoice.pdf"))
            );
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(8000, () => {
    console.log("server started");
});
