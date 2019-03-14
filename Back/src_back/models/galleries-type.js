module.exports = (sequelize, DataTypes) => {

    const GalleryType = sequelize.define('GalleryType', {
        // ID: {
        //     type: DataTypes.INTEGER,
        //     primareKey: true,
        //     autoiIncrement: true
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    GalleryType.associate = (models) => {
       GalleryType.hasMany(models.Galleries);
    }

    return GalleryType;
}