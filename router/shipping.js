const express=require("express")

const router = express.Router()

const shipping = require("../controller/shipping")

router.get("/shipping",shipping.shipping)

router.get("/shipping/region/:shipping_id",shipping.shipping_region_id)


module.exports = router

