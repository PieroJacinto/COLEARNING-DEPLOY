module.exports = (sequelize,dataTypes) =>{
    let alias='ColorCategory';
    let cols={
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        color_id: {
            type: dataTypes.INTEGER(10),
        },
        category_id: {
            type: dataTypes.INTEGER(10),
        }
    };
    let config= {
        tableName:'color_categories',
        timestamps: false,
        deletedAt: false
    };

    const ColorCategory = sequelize.define(alias, cols, config); 

    ColorCategory.associate = (models)=>{
        ColorCategory.belongsTo(models.Color, { foreignKey: 'color_id' })
        ColorCategory.belongsTo(models.Category, { foreignKey: 'category_id' })
    }

    return ColorCategory
}