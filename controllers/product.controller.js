const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Product = require("../models/product.model");

router.post("/",
    body("first_name")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("First Name should not be empty"),
    body("last_name")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Last Name should not be empty"),
     body("email")
        .notEmpty()
         .custom((value) => {
             let flag = false;
             for (var i = 0; i < value.length; i++){
                 if (value[i] == "@") {
                    flag = true;
                 }
             }
            if (flag===false) throw new Error("Email is not Valid");
            return true;
         }),
     body("pincode")
        .notEmpty()
        .custom((value) => {
            if (value.length != 6) throw new Error("Pincode is not Valid");
            return true;
        }),
     body("age")
        .notEmpty()
        .custom((value) => {
            if (value <= 0 || value >= 100) throw new Error("Age is not Valid");
            return true;
        }),
    body("gender")
        .notEmpty()
        .custom((value) => {
            if (value != "Male" && value != "Female" && value != "Others") throw new Error("Please enter correct gender");
            return true;
        }),
    async function (req, res) {
        console.log(body("title"));
        try {
          const errors = validationResult(req);
           if ((!errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
           }
        
            const product = await Product.create(req.body);

           return res.status(201).send(product);
        } catch(err) {
            return res.status(400).send(err.message);
      }
        
});

router.post("/multiple", async function (req, res) {
   
});



module.exports = router;