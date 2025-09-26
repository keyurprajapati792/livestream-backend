import User from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";

export const registerUser = async (req, res) => {
  try {
    const { name, contact, email, city, institution, profession } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "User already exists, Please try with different email" });

    const user = await User.create({
      name,
      contact,
      email,
      city,
      institution,
      profession,
    });

    // Send confirmation email
    const subject = `Thank You for Registering – NURSING INNOVATION AND BETTER PATIENT OUTCOME | 27TH September 2025`;
    const html = `
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for registering for our upcoming webinar:</p>
      <h3>NURSING INNOVATION AND BETTER PATIENT OUTCOME</h3>
      <p>
        <strong>Date:</strong> 27TH September 2025 <br/>
        <strong>Time:</strong> 9:00 AM – 1:30 PM (India Standard Time)
      </p>
      <p>During this webinar, you will learn:</p>
      <ul>
        <li>Modern Peripheral IVC</li>
        <li>Recent Advances in Safe Infusion Theory</li>
        <li>Future Trends in Nursing</li>
        <li>Case study presentation</li>
        <li>Role of Nursing in Infection Control Standards</li>
        <li>Saving Nursing Time</li>
      </ul>
      <p>
        We are excited to have you join us for this engaging session where our expert speakers will share valuable insights and answer your questions live.
      </p>
      <p>
        Please mark your calendar and ensure you have a stable internet connection during the session.<br/>
        A reminder email with the joining link will be sent <strong>1 day before the webinar</strong>.
      </p>
      <p>
        If you have any specific questions you’d like us to cover, feel free to reply to this email.
      </p>
      <p>We look forward to seeing you there!</p>
      <br/>
      <p>Warm regards,<br/><strong>BBRAUN TEAM</strong></p>
    `;

    await sendMail(email, subject, html);

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
