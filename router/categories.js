const express=require("express")

const router = express.Router()

const category  = require("../controller/categories")



router.get("/categories",category.categories)

router.get("/category_id/:category_id",category.category_id)

router.get("/categories_product_id/:product_id",category.categories_product_id)

router.get('/categories/inDepartment/:department_id',category.categories_by_department_id)


module.exports = router         

