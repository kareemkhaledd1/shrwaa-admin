const { Order } = require("../models/order");
const twilio = require("twilio");
const { Product } = require("../models/product");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let order, otpCode;

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      {},
      { otpCode: false, otpCodeExpire: false },
    ).populate("product");
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("product");
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user" });
  }
};

const newOrder = async (req, res) => {
  const {
    username,
    avenue,
    phoneNumber,
    street,
    building,
    city,
    block,
    status,
    price,
  } = req.body;

  const product = await Product.findById(req.body.product);

  otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  const otpCodeExpire = new Date(Date.now() + 60000);

  try {
    order = new Order({
      username,
      phoneNumber,
      block,
      avenue,
      street,
      building,
      city,
      status,
      price,
      otpCode,
      otpCodeExpire,
      product: product,
    });

    await client.messages.create({
      body: `Your OTP code is ${otpCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.status(201).json({
      message: "Form submitted successfully. OTP sent for verification.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Phone Number Not Valid" });
  }
};

const verifyUser = async (req, res) => {
  const { otpCode } = req.body;
  if (!otpCode)
    return res.status(400).json({ message: "OTP code is required" });
  try {
    if (order.otpCode === otpCode && order.otpCodeExpire > Date.now()) {
      order = await order.save();
      const { otpCode, otpCodeExpire, ...resUser } = order._doc;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL, // sender email
          pass: process.env.PASSWORD, // App password from gmail account
        },
      });

      const mailOptions = {
        from: {
          name: "shrwaa.com",
          address: process.env.EMAIL,
        }, // sender address
        to: ["designland177720@gmail.com"], // list of receivers
        subject: "Order from shrwaa", // Subject line
        text: "New order has been created" + order.product.name, // plain text body
        html: `<div>
          <b>New order has been created: ${order.product.name}</b>
          <br />
          <img src="${order.product.img}" alt="${order.product.name}" />
        </div>`, // html body
      };

      const sendMail = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", sendMail.messageId);

      return res
        .status(201)
        .json({ message: "Order verified successfully", resUser });
    } else {
      return res.status(403).json({ message: "Invalid OTP code" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to verify user" });
  }
};

module.exports = {
  getOrders,
  getOrder,
  newOrder,
  verifyUser,
};
