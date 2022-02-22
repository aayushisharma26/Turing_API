const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
const generateUniqueId = require('generate-unique-id');
var app = express();
app.use(express.json());
app.use(bodyParser.json());

// Generate Unique ID

shopping_uniqueId=(req,res)=>{
    const id = generateUniqueId({
        length: 32,
        useLetters: true
      });
    res.send(id)

}

// Add a product in the card

add_shopping_cart=(req,res)=>{
    const data={
        cart_id :req.body.cart_id,
        product_id:req.body.product_id,
        attributes:req.body.attributes,
        quantity :1,
        added_on:new Date()
    }
    knexcon("shopping_cart").insert(data) 
    .then((update)=>{
        console.log(update)
        res.send({data:"data insert sucessfully",
        inserted:update})

    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
} 

// get All shoppig cart data 

get_data=(req,res)=>{
    knexcon("shopping_cart").select("shopping_cart.item_id","product.name","shopping_cart.attributes","product.product_id","product.price","shopping_cart.quantity","product.image").join("product","shopping_cart.product_id","product.product_id")
    .where("cart_id",req.params.cart_id)
    .then((data)=>{
        for(i of data)
        i.subtotal=i.price *i.quantity
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}

// Get List of Products in Shopping Cart

shopping_cart_update=(req,res)=>{
    knexcon("shopping_cart").where("item_id",req .params.item_id)
    .update({
        quantity:req.body.quantity
    })
    .then((data)=>{
        res.send(message='Quantity updated')

    })
    .catch((err)=>{
        res.send(err)
    })
}

// Delete (Empaty cart)

shopping_cart_delete=(req,res)=>{
    knexcon.delete("*").from("shopping_cart").where("cart_id",req.params.cart_id)  
    .then((deleted)=>{
        res.send({message:'deleted sueccfully'})
    })  
    .catch((err)=>{
        res.send(err)
    })

}

// Return a total Amount from Cart

get_totalAmount=(req,res)=>{
    knexcon.select("*").from("shopping_cart").join("product","shopping_cart.product_id","product.product_id").where("cart_id",req.params.cart_id)
    .then((data)=>{
        total_amount=0
        for ( i of data){
            total_amount+=data[0].quantity*data[0].price
        }
        
        res.send({"total_amount":total_amount})

    }).catch((err)=>{
        res.send(err)
    })
}

//Remove the product in the cart

remove_product=(req,res)=>{
    knexcon.delete("*").from("shopping_cart").where("product_id",req.params.product_id)
    .then((data)=>{
        res.send("No Data")
    })
    .catch((err)=>{
        res.send(err)
    })

}

module.exports={shopping_uniqueId,add_shopping_cart,get_data,shopping_cart_update,shopping_cart_delete,get_totalAmount,remove_product}

