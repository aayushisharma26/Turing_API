const express=require("express")

const router = express.Router()

const user = require("../controller/shoppingcart")


router.get("/shopping_uniqueId",user.shopping_uniqueId)

router.post("/shoppingcart/add",user.add_shopping_cart)

router.get("/shoppingcart/:cart_id",user.get_data)

router.put("/shoppingcart/update/:item_id",user.shopping_cart_update)

router.delete("/shoppingcart/delete/:cart_id",user.shopping_cart_delete)

router.get("/shoppingcart/totalAmount/:cart_id",user.get_totalAmount)

router.delete("/shoppingcart/removeProduct/:product_id",user.remove_product)

module.exports = router