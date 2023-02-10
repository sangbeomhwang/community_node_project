module.exports = (sequelize, Sequelize) => {
    class Chats extends Sequelize.Model {
        static initilize() {
            return this.init(config, setting)
        } 

        static associate(models) {
            this.belongsTo(models.Users, {
                foreignKey: 'nickname'
            })
        }
    }

    const config = {
        message: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        register: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        }
    }

    const setting = {
        sequelize,
    }

    Chats.initilize()
}