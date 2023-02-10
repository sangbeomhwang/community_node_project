module.exports = (sequelize, Sequelize) => {
    class Points extends Sequelize.Model {
        static initilize() {
            return this.init(config, setting)
        }

        
        static associate(models) {
            this.belongsTo(models.Users, {
                foreignKey: 'nickname',
              });
    }}

    const config = {
        pointCount: {
            type: Sequelize.ENUM('board', 'comment'),
            allowNull: false,
            defaultValue: 'comment', 
        }
    }

    const setting = {
        sequelize,
    }

    Points.initilize()
}
