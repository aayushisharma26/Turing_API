const express=require("express")

const router = express.Router()

const user = require("../controller/tax")

router.get("/tax",user.tax)

router.get("/tax/:tax_id",user.tax_id)

module.exports = router
