const express=require("express")

const router = express.Router()

const attribute = require("../controller/attribute")



router.get("/attribute",attribute.attribute)

router.get("/attribute/:attribute_id",attribute.attribute_id)

router.get ("/attribute/values/:attribute_id",attribute_by_value)

router.get('/attribute/inProduct/:product_id',attribute.attribute_by_product_id)



module.exports = router
