const express=require("express")

const router = express.Router()

var auth=require("../authorization/auth")

const orders = require("../controller/orders")

router.post("/orders",auth,post_orders)

router.get("/orders/:incustomer",auth,orders.get_customer_id)

router.get("/orders/:order_id",auth,orders.get_orders)

router.get('/orders/shortDetail/:order_id',auth,orders. getInfo_order)


module.exports = router