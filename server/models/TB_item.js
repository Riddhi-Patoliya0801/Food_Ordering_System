module.exports= (sequelize,DataTypes)=>{
    const Items = sequelize.define("TB_Item", {
      ItemName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ItemPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ItemImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    return Items;
}