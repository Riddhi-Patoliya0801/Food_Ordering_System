const express=require('express')
const app=express()
const tb=require('./models')
const cors=require('cors')

const item=require('./routes/itemRoute')
const OrderCart=require('./routes/orderCart')
const Order=require('./routes/orderRoute')

app.use(express.json())
app.use(cors())

app.use('/item',item)
app.use('/OrderCart',OrderCart)
app.use('/Order',Order)

tb.sequelize.sync().then(()=>{
    app.listen(5000,()=>{
        console.log("server running on port 5000");
    })
})