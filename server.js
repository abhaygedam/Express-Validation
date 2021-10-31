const express = require("express");

const connect = require("./config/db");

const app = new express();
app.use(express.json());

const productController = require("./controllers/product.controller");

app.use("/products", productController);

app.listen(2350, async () => {
    await connect();
    console.log("listening on port 2350");
})