const { Order } = require("../models/order");
const twilio = require("twilio");
const { Product } = require("../models/product");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let order, otpCode;

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

const aggregateOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Group by day
          },
          count: { $sum: 1 }, // Count the number of orders per day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    let filter = {};

    const search = req.query.search || "";

    if (search) {
      filter.$or = [{ username: { $regex: search, $options: "i" } }];
    }

    const totalCount = await Order.countDocuments(filter);

    const orders = await Order.find(filter, {
      otpCode: false,
      otpCodeExpire: false,
    })
      .populate("product")
      .skip(skip)
      .sort({ createdAt: sortOrder })
      .limit(limit);

    res.status(200).json({ orders, totalCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("product");
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get order" });
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
    res.status(500).json({ message: "Failed to verify order" });
  }
};

module.exports = {
  aggregateOrders,
  getAllOrders,
  getOrders,
  getOrder,
  newOrder,
  verifyUser,
};
