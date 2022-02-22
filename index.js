const express=require("express")
const app=express()
const department=require("./router/department")
const categories=require("./router/categories")
const tax=require("./router/tax")
const shipping=require("./router/shipping")
const attribute=require("./router/attribute")
const products=require("./router/products")
const shoppingcart=require("./router/shoppingcart")
const orders=require("./router/orders")
const customers=require("./router/customers")
const cookie=require("cookie-parser")

app.use(cookie())

app.use(express.json())
app.use ("/user",department,categories,tax,shipping,attribute,products,shoppingcart,orders,customers)

app.listen(4000,()=>{
    console.log("listning to the portal")
})
