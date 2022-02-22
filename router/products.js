const express=require("express")
const auth=require('../authorization/auth')
const router = express.Router()

const user= require("../controller/products")

router.get("/products",user.products)

// router.get("/products_by_products_id",user.products_by_products_id)

router.get("/products/:product_id",user.products_by_product_id)

router.get("/products/inCategory/:category_id",user.products_by_category)

router.get('/products/inDepartment/:department_id',user.products_by_department_id)

router.get("/products/details/:product_id",user.products_by_details)

router.get('/products/locations/:product_id',user.get_location)

router.post("/products/reviews",auth,user.post_reviews)
// router.post("/product/review",authentication,Post_review_By_product_id)
// router.post('/products/review', chackAuth, post_reviews)

router.get("/products/reviews/:product_id",user.get_reviews)

module.exports = router


