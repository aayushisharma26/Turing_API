const express=require("express")

const router = express.Router()

const user = require("../controller/department")

router.get("/department",user.department)

router.get("/department/:department_id",user.department_id)




module.exports = router

