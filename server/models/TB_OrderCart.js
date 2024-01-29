module.exports= (sequelize,DataTypes)=>{
    const orderCart=sequelize.define("TB_OrderCart",{
        ItemId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ItemName:{
            type:DataTypes.STRING,
            allowNull:false
        }, 
        ItemQuantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ItemPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        TotalPrice:{
            type:DataTypes.DECIMAL,
            allowNull:false
        }
    })

    return orderCart;
}