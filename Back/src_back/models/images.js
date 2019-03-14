module.exports = (sequelize, DataTypes) => {

    const Images = sequelize.define('Images', {
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
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Images.associate = (models) => {
        Images.hasMany(models.Posts);
        Images.belongsToMany(models.Galleries, {through: 'Galleries_Images', foreignKey: 'imageID'});
    }

    return Images;
}