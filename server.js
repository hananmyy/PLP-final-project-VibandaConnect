const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize, Customer, Rider, Vendor } = require("./models");
const session = require("express-session");

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// API endpoints fetching data from the database
app.get('/api/customer', async (req, res) => {
  try {
    const customer = await Customer.findOne(); // Adjust as needed to get the specific customer
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/rider', async (req, res) => {
  try {
    const rider = await Rider.findOne(); // Adjust as needed to get the specific rider
    res.json(rider);
  } catch (error) {
    console.error('Error fetching rider data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/vendor', async (req, res) => {
  try {
    const vendor = await Vendor.findOne(); // Adjust as needed to get the specific vendor
    res.json(vendor);
  } catch (error) {
    console.error('Error fetching vendor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Import and register routes
const vendors = require("./routes/vendors");
const riders = require("./routes/riders");
const customers = require("./routes/customers");
const orders = require("./routes/orders");

app.use("/vendors", vendors);
app.use("/riders", riders);
app.use("/customers", customers);
app.use("/orders", orders);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
