const environment=process.env.ENVIRONMENT || 'development'
const config=require('../knexfile')[environment]
const knex=require("knex")(config)

//For getting all the tax:

tax=(req,res)=>{
    knex('tax')
    .select("*")
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}

//For getting tax by tax_id:

tax_id=(req,res)=>{
    knex("tax").select("*").where("tax_id",req.params.tax_id)
    .then((posts)=>{
        res.send(posts)
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
}

module.exports={tax,tax_id}