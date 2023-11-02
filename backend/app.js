const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1", order);

module.exports = app