module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Customer.hasMany(models.Burger, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return Customer;
};