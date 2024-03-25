module.exports = (sequelize,dataTypes) =>{
    let alias='Brand';
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
        tableName: "brands",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Brand = sequelize.define(alias, cols, config); 

    Brand.associate = function (models) {
        Brand.hasMany(models.Product,{
            as:'products',
            foreignKey:'brand_id'
        })
    }
    return Brand
}