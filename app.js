const path = require("path");
const express = require("express"); //Include Express Header for its Methods.
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //Include Mongoose header for its Methods.

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const companyRouter = require("./routes/companys");
const productRoutes = require("./routes/products"); //Includes Router methods for product-api
const subProdRoutes = require("./routes/subProd");
const challanRoutes = require("./routes/challan");

const joinRouter = require("./routes/join");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://gh0oDGGJbG8QbDfD:" + process.env.MONGO_ATLAS_PS + "@testing.wyqfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database!"); //Connecting Database with Express.
  })
  .catch((e) => {
    console.log("Connection failed!" + e);
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT,PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/company", companyRouter);
app.use("/api/product", productRoutes);
app.use("/api/subProd", subProdRoutes);
app.use("/api/challan", challanRoutes);
app.use("/api/join", joinRouter);

module.exports = app;
