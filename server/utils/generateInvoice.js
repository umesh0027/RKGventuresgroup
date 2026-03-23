const PDFDocument = require("pdfkit");
const path = require("path");

const generateInvoice = (order) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    // 🖼️ LOGO
    const logoPath = path.join(__dirname, "../assets/logo.png"); // 👈 apna logo yaha daalo
    try {
      doc.image(logoPath, 50, 45, { width: 100 });
    } catch (e) {}

    // 🏢 COMPANY INFO
    doc
      .fontSize(20)
      .text("RKG Ventures Group", 200, 50)
      .fontSize(10)
      .text("Healthcare Products ", 200, 75)
      .text("Delhi, India", 200, 90)
      .text("GST: 07AAQHK5877F1ZN", 200, 105)
      .moveDown();

    // 🧾 INVOICE TITLE
    doc
      .fontSize(18)
      .text("INVOICE", 50, 150);

    // 📅 ORDER DETAILS
    doc
      .fontSize(10)
      .text(`Invoice No: ${order._id}`, 50, 180)
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 50, 195)
      .text(`Payment: ${order.paymentStatus}`, 50, 210);

    // 👤 CUSTOMER DETAILS
    doc
      .text(`Customer: ${order.user.name}`, 300, 180)
      .text(`Email: ${order.user.email}`, 300, 195)
      .text(`Address: ${order.shippingAddress}`, 300, 210)
      .text(`Phone: ${order.phone}`, 300, 225);

    // 🔲 TABLE HEADER
    const tableTop = 260;

    doc
      .fontSize(11)
      .text("Product", 50, tableTop)
      .text("Price", 250, tableTop)
      .text("Qty", 320, tableTop)
      .text("Total", 380, tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    // 🛒 ITEMS
    let y = tableTop + 25;

    order.items.forEach((item) => {
      doc
        .fontSize(10)
        .text(item.name, 50, y)
        .text(`₹${item.price}`, 250, y)
        .text(item.qty, 320, y)
        .text(`₹${item.price * item.qty}`, 380, y);

      y += 20;
    });

    // LINE
    doc.moveTo(50, y).lineTo(550, y).stroke();

    // 💰 TOTAL SECTION
    doc
      .fontSize(12)
      .text(`Subtotal: ₹${order.totalAmount}`, 350, y + 20)
      .text(`GST (Included)`, 350, y + 35)
      .fontSize(14)
      .text(`Grand Total: ₹${order.totalAmount}`, 350, y + 55);

    // 📝 FOOTER
    doc
      .fontSize(10)
      .text(
        "Thank you for your business!",
        50,
        750,
        { align: "center" }
      );

    doc
      .fontSize(8)
      .text(
        "This is a computer-generated invoice.",
        50,
        770,
        { align: "center" }
      );

    doc.end();
  });
};

module.exports = generateInvoice;