const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Save to DB
    const contact = await Contact.create({ name, email, message });

    // ✅ Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: "New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.json({ msg: "Message sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error sending message" });
  }
};



// GET ALL MESSAGES (ADMIN)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching messages" });
  }
};

// DELETE MESSAGE
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting message" });
  }
};


exports.toggleImportant = async (req, res) => {
  try {
    const msg = await Contact.findById(req.params.id);

    msg.isImportant = !msg.isImportant;
    await msg.save();

    res.json(msg);
  } catch (err) {
    res.status(500).json({ msg: "Error updating" });
  }
};