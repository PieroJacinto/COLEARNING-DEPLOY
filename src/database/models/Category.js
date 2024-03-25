module.exports = (sequelize,dataTypes) =>{
    let alias='Category';
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
        image:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,     
    
    };
    let config= { 
        tableName: "categories",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function (models) {
        Category.belongsToMany(models.Color,{
            as:'colors',
            through: 'color_categories',
            foreignKey: 'category_id',
            otherKey: 'color_id',
            timestamps: false   
        })
        Category.hasMany(models.ColorCategory,{
            foreignKey: 'category_id',
            onDelete: 'CASCADE'
        })
        Category.hasMany(models.Product,{
            as:'products',
            foreignKey:'category_id'
        })
    }

    return Category
}