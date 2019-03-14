module.exports = (sequelize, DataTypes) => {

    const Galleries = sequelize.define('Galleries', {
        // ID: {
        //     type: DataTypes.INTEGER,
        //     primareKey: true,
        //     autoiIncrement: true
        // },
        tagTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Galleries.associate = (models) => {
        Galleries.belongsToMany(models.Images, {through: 'Galleries_Images', foreignKey: 'galleryID'});
        Galleries.belongsToMany(models.Posts, {through: 'Posts_Galleries', foreignKey: 'galleryID'});
       Galleries.belongsTo(models.GalleryType);
    }

    return Galleries;
}