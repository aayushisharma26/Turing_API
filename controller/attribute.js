const environment=process.env.ENVIRONMENT || 'development'
const config=require('../knexfile')[environment]
const knex=require("knex")(config)

// For getting the attributes: 

attribute=(req,res)=>{
    knex('attribute')
    .select('*')
    .then((posts)=>{
        res.send(posts
        )
    })
    .catch((err)=>{
        res.send({
            Error:err
        })
    }) 
}

//For getting the attributes by attributes_id:

attribute_id=(req,res)=>{
    knex("attribute")
    .select("*").where("attribute_id",req.params.attribute_id)
    .then((posts)=>{
        res.send(posts)
    })
    .catch((err)=>{
        res.send(err)
    })
}

//For getting the attributes by value:

attribute_by_value = function(req,res){
    knex('attribute_value')
    .select('attribute_value.attribute_value_id','attribute_value.value')
    .join('attribute','attribute_value.attribute_value_id','=','attribute.attribute_id')
    .where('attribute.attribute_id',req.params.attribute_id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}

//For getting the attributes by product_id:

attribute_by_product_id = function(req,res){
    knex('attribute')
    .select('attribute.name','product_attribute.attribute_value_id','attribute_value.value')
    .join("attribute_value", "attribute.attribute_id", "=", "attribute_value.attribute_id")
    .join("product_attribute", "attribute_value.attribute_value_id", "=", "product_attribute.attribute_value_id")
    .where('product_attribute.product_id',req.params.product_id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}

module.exports={attribute,attribute_id,attribute_by_value,attribute_by_product_id}