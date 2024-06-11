const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3005
const app = express();
const mongoose = require('mongoose');

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://commercekv:commercekv@cluster0.2fminxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const ProductRouter = require("./routes/product_route");
app.use("/api/product", ProductRouter);

app.listen(PORT, function () {
    console.log("Server started at ", PORT);
});