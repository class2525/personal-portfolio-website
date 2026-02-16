const Contact = require('../models/Contact');
const transporter = require('../config/email');

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
