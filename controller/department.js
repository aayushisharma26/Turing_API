const environment=process.env.ENVIRONMENT || 'development'
const config=require('../knexfile')[environment]
const knex=require("knex")(config)

//For getting all the departments:

department=(req,res)=>{
    knex('department')
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

//For getting department by department_id:

department_id=(req,res)=>{
    knex("department").select("*").where("department_id",req.params.department_id)
    .then((posts)=>{
        res.send(
            posts
        )

    }).catch((err)=>{
        res.send({
            Error:err
        })
    })
}






module.exports={department,department_id}