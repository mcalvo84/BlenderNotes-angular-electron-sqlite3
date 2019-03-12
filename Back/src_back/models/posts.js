module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define('Posts', {
        // ID: {
        //     type: DataTypes.INTEGER,
        //     primareKey: true,
        //     autoiIncrement: true
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Posts.associate = (models) => {
        Posts.belongsTo(models.Users);
        Posts.belongsTo(models.Images);
        Posts.belongsTo(models.Blogroll);
        Posts.belongsToMany(models.Tags, {through: 'Posts_Tags', foreignKey: 'postID'});
        Posts.belongsToMany(models.Galleries, {through: 'Posts_Galleries', foreignKey: 'postID'});
        Posts.belongsToMany(models.Downloads, {through: 'Posts_Downloads', foreignKey: 'postID'});
        Posts.belongsToMany(models.Notes, {through: 'Posts_Notes', foreignKey: 'postID'});

    }

    return Posts;
}