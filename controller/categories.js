const environment=process.env.ENVIRONMENT || 'development'
const config=require('../knexfile')[environment]
const knex=require("knex")(config)

//For getting all the categories:

categories=(req,res)=>{
    knex('category')
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

//For getting the categories by category_id:

category_id =(req,res)=>{
    knex("category").select("*").where("category_id",req.params.category_id)
    .then((post)=>{
        res.send(post)
    })
    .catch((err)=>{
        res.send({
            error:err
        })
    })

}       

//For getting the categories by product_id:

categories_product_id =(req,res)=>{
    knex("category").select('category.category_id','category.department_id','category.name')

    .join('product_category','category.category_id',"=",'product_category.category_id')
    
    .where('product_category.product_id',req.params.product_id)

    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
    
}

//For getting the categories by department_id:

categories_by_department_id = function(req,res){
    knex('category')
    .select('category.category_id','category.name','category.description')
    .join('department','category.category_id','=','department.department_id')
    .where('department.department_id',req.params.department_id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}

module.exports={categories,category_id,categories_product_id,categories_by_department_id}

