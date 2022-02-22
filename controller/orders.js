const environment=process.env.ENVIRONMENT || 'development'
const config=require('../knexfile')[environment]
const knex=require("knex")(config)

post_orders=(req,res)=>{
    knex("shopping_cart")
    .innerJoin("product","shopping_cart.product_id","product.product_id")
    .select('*')
    .then((data)=>{
        sum=0
        for (i of data){
            sum+=i.price *  i.quantity
        }
      
        knex("orders").insert({
            total_amount:sum,
            created_on:new Date(),
            shipped_on:new Date(),
            status:1,
            customer_id:req.userData.customer_id, 
            shipping_id:req.body.shipping_id,
            tax_id:req.body.tax_id

        })
        .then((postData)=>{
            for(i of data){
               const order_detail={
               order_id:postData[0] ,
               product_id:i.product_id,
               attributes:i.attributes,
               product_name:i.name,
               quantity:i.quantity,
               unit_cost:i.price
               }
               knex("order_detail").insert(order_detail)
               .then((order_detail_Data)=>{
                   console.log(order_detail_Data)
               })
               .catch((err)=>{
                   res.json({
                       succes:false,
                       status:500,
                       message:"Not inserted order_detail",
                       error:err
                   })
               })
            }
            knex.select("*").from("shopping_cart").where("cart_id","=",req.body.cart_id).del()
            .then((del_data)=>{
                res.send({message:"deleted successfully",del_data:del_data})
            }).catch((err)=>{
                res.send({ err:err})
                // console.log(err)
            })

        }).catch((err)=>{
            res.json({
                succes:false,
                status:500,
                error:"not post data",
                error:err
            })
        })
    }).catch((err)=>{
        res.send({error:"error",err:err})
        console.log(err)
    })

}

get_orders=(req, res) =>{
    knex('orders')
    .innerJoin('order_detail','orders.order_id','order_detail.order_id')
    .select('*').where('orders.order_id',req.params.order_id)
        .then((get_orders) => {
            for (i of get_orders) {
                i.subtotal = i.unit_cost * i.quantity
            }
            // console.log(get_data);
            res.json({
                sucsses: true,
                message: 'order_id ',
                orders: get_orders
            })
        }).catch((err) => {
            // console.log(err)
            res.status(400).json({
                message: `order id is Invalid ${err}`
            })

        })
}

get_customer_id = (req, res) => {
    knex('orders')
    .join('customer', 'orders.customer_id', 'customer.customer_id')
    .select('orders.order_id','orders.total_amount','orders.created_on','orders.shipped_on','orders.status','customer.name')
    .where('customer.customer_id', '=',req.userData.customer_id)
    .then((get_Customer) => {
            // console.log(get_Customer)
        res.json({
            succes: true,
            message: 'Order By Customercustomer Id',
            orderCustomer: get_Customer
        })
    }).catch((err) => {
            // console.log(err);
        res.json({
                message: 'data not found'
            })
        })

}

getInfo_order = (req, res)=> {
    knex.select('order_id', 'total_amount', 'created_on', 'shipped_on', 'status').from('orders')
    .where('order_id', req.params.order_id)
    .then((info_order) => {
        res.send(        
           (order= info_order)
        )
    }).catch((err) => {
        // console.log(err);
        res.json({
            message: 'order is not exits!'
        })
    })
}

module.exports={post_orders,get_orders,get_customer_id,getInfo_order}
