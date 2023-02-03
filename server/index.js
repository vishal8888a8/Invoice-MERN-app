const express = require("express");
const cors = require("cors");
const word = require("number-to-words");
const productCol = require("./db/schema");
const { printPdf } = require("./helpers/converter");
const path = require("path");

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
        function percentCalculator(a, b) {
            const result = Math.round((a * b) / 100);
            return result;
        }

        if (data.length === 0) res.sendStatus(400);
        else {
            let parameter = {
                subTotal: 0,
                cgst: 0,
                sgst: 0,
                total: 0,
                totalWords: "",
                products: [],
            };

            for (let i = 0; i < data.length; i++) {
                const _id = data[i].id;

                let productArr = await productCol.find({ _id }).lean();
                let product = productArr[0];
                product.quantity = data[i].count;

                let sumAmout = product.quantity * product.mrp;

                product.cgst = percentCalculator(product.gst / 2, sumAmout);
                product.sgst = percentCalculator(product.gst / 2, sumAmout);
                product.amount = percentCalculator(product.discount, sumAmout);
                product.index = i + 1;
                product.cpercent = product.gst / 2;
                product.spercent = product.gst / 2;

                parameter.products.push(product);
                parameter.cgst += product.cgst;
                parameter.sgst += product.sgst;
                parameter.subTotal += product.amount;
                parameter.total += product.cgst + product.sgst + product.amount;
                parameter.totalWords = word.toWords(parameter.total) + " only";
            }
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
