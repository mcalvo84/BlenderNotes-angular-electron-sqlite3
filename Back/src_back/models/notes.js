module.exports = (sequelize, DataTypes) => {

    const Notes = sequelize.define('Notes', {
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

    Notes.associate = (models) => {
       Notes.belongsToMany(models.Posts, {through: 'Posts_Notes', foreignKey: 'tagID'});
       Notes.hasMany(models.Notes, {as: 'children', foreignKey: 'ParentId'});
       Notes.belongsTo(models.Notes, {as: 'parent', foreignKey: 'ParentId'});
    }

    return Notes;
}