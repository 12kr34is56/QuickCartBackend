require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3005
const app = express();
const mongoose = require('mongoose');
const { ProductRoutes,UserRoutes,CategoryRoutes } = require('./routes');

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log("Error: ", e);
});


app.use("/api/product", ProductRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/category", CategoryRoutes);

app.get("/", function (req, res) {
    res.send("Server is workinng all fine");
});

const CartRouter = require("./routes/cart_route");
app.use("/api/cart", CartRouter);

app.listen(PORT, function () {
    console.log(`Server started at: http://localhost:${PORT}`);
});