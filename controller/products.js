const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile");
const { query } = require("express");
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());


products = (req, res) => {
    knexcon.select("*").from("product").
    then((result) => {
            console.log(result)
            if (req.query.page == undefined) {
                req.query.page = 1
            }
            if (req.query.limit == undefined) {
                req.query.limit = 20
            }
            knexcon("product").count("product_id")
                .then((count) => {
                    knexcon.select("*").from("product").offset((req.query.page - 1) * req.query.limit).limit(req.query.limit)
                        .then((data) => {
                            for (i in data) {
                                if (req.query.description_length != undefined) {
                                    data[i]["description"] = data[i]["description"].slice(0, data[i]["description"].length - (data[i]["description"].length - req.query.description_length))
                                } else {
                                    data[i]["description"] = data[i]["description"]
                                }
                            }
                            res.send({
                                count: count[0]['count(`product_id`)'],
                                rows: data
                            })
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                })
        })
        .catch((err) => {
            res.send(err)
        })
}



products_by_product_id=(req,res)=>{
    knexcon("product")
    .select("*")
    .where("product_id",req.params.product_id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}

products_by_category=(req,res)=>{
    var page=req.query.page;
    var limit=req.query.limit;
    if (page&&limit){
        page=parseInt(page)
        limit=parseInt(limit)
        page=page*limit-limit
    }
    else{
        page=0
        limit=101
    }
    knexcon.select("product.product_id","product.name","product.description","product.price","product.discounted_price","product.thumbnail")
    .from("product_category")
    .join("category","category.category_id","product_category.category_id")
    .join("product","product_category.product_id","product.product_id")
    .where("category.category_id",'=',req.params.category_id).limit(limit).offset(page)
    .then((data) => {
        console.log(data);
        res.json({ 
        "count":data.length,
        "row": data });
      })
      .catch((er) => {
        console.log(er);
        res.json({ message: er });
      });
}

products_by_department_id = (req, res) => {
    var body = req.query;
    var limit = body.limit;
    var des = req.description_length;
    knexcon.select("*").from("category").join("product_category", function() {
            this.on("category.category_id", "product_category.category_id")
        }).join('product', function() {
            this.on("product_category.product_id", "product.product_id")
        }).where("department_id", req.params.department_id).limit(limit).offset((req.query.page - 1) * req.query.limit)
        .then((data) => {
            var out = []
            for (var i of data) {
                var dic = {
                    "product_id": i.product_id,
                    "name": i.name,
                    "description": i.description,
                    "price": i.price,
                    "discounted_price": i.discounted_price,
                    "thumbnail": i.thumbnail
                }
                out.push(dic)
            }
            res.send({ counts: out.length, rows: out })
        })
}
    
products_by_details=(req,res)=>{
    knexcon.select("product_id","name","description","price","discounted_price","image","image_2")
    .from("product").where("product.product_id",req.params.product_id)
    .then((data)=>{
        console.log(data);
        res.send(data);
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
}


get_location = (req, res) => {
    knexcon('product_category')
        .innerJoin('category', 'product_category.category_id', 'category.category_id')
        .join('department', 'department.department_id', 'category.department_id')
        .select({ 'category': 'category.category_id', 'category_name': 'category.name', 'department_id': 'department.department_id', 'department_name': 'department.name' })
        .where('product_category.product_id', req.params.product_id)
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 402,
                message: 'Invalid product id',

            })

        })

}
post_reviews=(req,res)=>{
    const user={
      customer_id:req.userData.customer_id,
      product_id:req.body.product_id,
      review:req.body.review,
      rating:req.body.rating,
      created_on:new Date()
    }
    knexcon("review").insert(user)
        .then((data)=>{
            knexcon.select("*").from("review").where("review_id",data)
            .then((postData)=>{
                res.json({
                    succes:true,
                    status:200,
                    message:"post succesfully",
                    data:postData})
            }).catch((err)=>{
                res.send({message:'review falid'})
            })
        }).catch((err)=>{
            // console.log(err);
            res.send({error:err})
        })   
    }


get_reviews=(req, res) => {
    knexcon("review").select('customer.name', 'review.review', 'review.rating', 'review.created_on').
    join("customer", "customer.customer_id", "review.customer_id").
    where('product_id',req.params.product_id)
    .then((result) => {
            // console.log(result)
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
}

module.exports={products,products_by_product_id,products_by_category,products_by_department_id,products_by_details,get_location,post_reviews,get_reviews}