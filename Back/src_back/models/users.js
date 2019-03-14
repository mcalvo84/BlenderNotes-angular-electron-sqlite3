module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('Users', {
        // ID: {
        //     type: DataTypes.INTEGER,
        //     primareKey: true,
        //     autoiIncrement: true
        // },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Posts);
    }

    return Users;
}