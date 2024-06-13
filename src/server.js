require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3005
const app = express();
const mongoose = require('mongoose');
const { ProductRoutes } = require('./routes');


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


const ProductRouter = require("./routes/product_route");
app.use("/api/product", ProductRoutes);

const CategoryRouter = require("./routes/category_route");
app.use("/api/category", CategoryRouter);

app.get("/", function (req, res) {
    res.send("Server is workinng all fine");
});

app.listen(PORT, function () {
    console.log(`Server started at: http://localhost:${PORT}`);
});