module.exports = (sequelize,dataTypes) =>{
    let alias='Color';
    let cols={
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,        
    };
    let config= {
        tableName:'colors',    
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Color = sequelize.define(alias, cols, config); 

    Color.associate = function (models) {
        Color.hasMany(models.ColorProduct,{
            foreignKey: 'color_id',
            onDelete: 'CASCADE'
        })
        Color.belongsToMany(models.Product,{
            as:'products',
            through: 'color_products',
            foreignKey: 'color_id',
            otherKey: 'product_id',
            timestamps: false   
        })
        Color.belongsToMany(models.Category,{
            as:'category',
            through: 'color_categories',
            foreignKey: 'color_id',
            otherKey: 'category_id',
            timestamps: false   
        })
        Color.hasMany(models.ColorCategory,{
            foreignKey: 'color_id',
            onDelete: 'CASCADE'
        })
    }

    return Color
}