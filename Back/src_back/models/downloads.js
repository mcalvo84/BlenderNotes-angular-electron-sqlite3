module.exports = (sequelize, DataTypes) => {

    const Downloads = sequelize.define('Downloads', {
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

    Downloads.associate = (models) => {
       Downloads.belongsToMany(models.Posts, {through: 'Posts_Downloads', foreignKey: 'downloadID'});
    }

    return Downloads;
}