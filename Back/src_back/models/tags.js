module.exports = (sequelize, DataTypes) => {

    const Tags = sequelize.define('Tags', {
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

    Tags.associate = (models) => {
       Tags.belongsToMany(models.Posts, {through: 'Posts_Tags', foreignKey: 'tagID'});
       Tags.belongsTo(models.TagType);
    }

    return Tags;
}