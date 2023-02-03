const fs = require("fs");
const path = require("path");
const { convertPdf } = require("./helper");
// const dataBinding = require("./data");

module.exports.printPdf = async (dataBinding, callback) => {
    try {
        (async () => {
            const templateHtml = fs.readFileSync(
                path.join(process.cwd(), "./template/invoice.html"),
                "utf8"
            );

            const options = {
                format: "A4",
                headerTemplate: "<p></p>",
                footerTemplate: "<p></p>",
                displayHeaderFooter: false,
                margin: {
                    top: "40px",
                    left: "40px",
                    right: "40px",
                },
                printBackground: true,
                path: "invoice.pdf",
            };

            await convertPdf({ templateHtml, dataBinding, options, callback });

            console.log("Done: invoice.pdf is created!");
        })();
    } catch (err) {
        console.log("ERROR:", err);
    }
};
