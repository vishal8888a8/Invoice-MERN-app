const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

module.exports.convertPdf = async ({
    templateHtml,
    dataBinding,
    options,
    callback,
}) => {
    const template = handlebars.compile(templateHtml);
    const finalHtml = encodeURIComponent(template(dataBinding));

    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
        waitUntil: "networkidle0",
    });
    await page.pdf(options);
    await browser.close();
    callback();
};
