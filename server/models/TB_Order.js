module.exports= (sequelize,DataTypes)=>{
    const Orders = sequelize.define("TB_Order", {
      CustomerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Contact: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      CustomerEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      NoOfMembers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      OrderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      OrderTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      Items: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      GrandTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      PaymentMode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    
    return Orders;
}