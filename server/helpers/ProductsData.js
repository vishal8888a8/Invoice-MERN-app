const word = require("number-to-words");
const productCol = require("../db/schema");

module.exports.ProductsData = async (data) => {
    let parameter = {
        subTotal: 0,
        cgst: 0,
        sgst: 0,
        total: 0,
        totalWords: "",
        products: [],
    };

    function percentCalculator(a, b) {
        const result = Math.round((a * b) / 100);
        return result;
    }

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
    return parameter;
};
