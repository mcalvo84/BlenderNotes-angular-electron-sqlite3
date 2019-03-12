module.exports = (sequelize, DataTypes) => {

    const TagType = sequelize.define('TagType', {
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

    TagType.associate = (models) => {
       TagType.hasMany(models.Tags);
    }

    return TagType;
}