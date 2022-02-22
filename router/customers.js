const express=require("express")

const router = express.Router()

const customers = require("../controller/customers")

var auth=require("../authorization/auth")

router.post("/customers_signup",customers.customers_signup)

router.post("/customers_login",customers.customers_login)

router.get("/get_signup/:customer_id",customers.get_signup)

router.put("/put_customers/:customer_id",auth,customers.put_customers)

router.put("/put_customer_address/:customer_id",auth,customers.put_customer_address)

router.put("/put_credit_card/:customer_id",auth,customers.put_credit_card)

module.exports = router

