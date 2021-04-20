const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

async function mergeTextPDF() {
  const pdf1 = await PDFDocument.load(fs.readFileSync("./text-pdf/text-1.pdf"));
  const pdf2 = await PDFDocument.load(fs.readFileSync("./text-pdf/text-2.pdf"));
  const pdf3 = await PDFDocument.load(fs.readFileSync("./text-pdf/text-3.pdf"));

  const doc = await PDFDocument.create();

  const pdf1pages = await doc.copyPages(pdf1, pdf1.getPageIndices());
  for (let pdf1page of pdf1pages) {
    doc.addPage(pdf1page);
  }

  const pdf2pages = await doc.copyPages(pdf2, pdf2.getPageIndices());
  for (let pdf2page of pdf2pages) {
    doc.addPage(pdf2page);
  }

  const pdf3pages = await doc.copyPages(pdf3, pdf3.getPageIndices());
  for (let pdf3page of pdf3pages) {
    doc.addPage(pdf3page);
  }

  fs.writeFileSync("./text-pdf/combined-pdf.pdf", await doc.save());
}

mergeTextPDF();
