const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

async function mergeSimplePDF() {
  const pdf1 = await PDFDocument.load(
    fs.readFileSync("./simple-pdf/simple-1.pdf")
  );
  const pdf2 = await PDFDocument.load(
    fs.readFileSync("./simple-pdf/simple-2.pdf")
  );

  const doc = await PDFDocument.create();

  const pdf1pages = await doc.copyPages(pdf1, pdf1.getPageIndices());
  for (let pdf1page of pdf1pages) {
    doc.addPage(pdf1page);
  }

  const pdf2pages = await doc.copyPages(pdf2, pdf2.getPageIndices());
  for (let pdf2page of pdf2pages) {
    doc.addPage(pdf2page);
  }

  fs.writeFileSync("./simple-pdf/combined-pdf.pdf", await doc.save());
}

mergeSimplePDF();
