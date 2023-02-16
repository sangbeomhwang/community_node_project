module.exports = (sequelize, Sequelize) => {
    class Comments extends Sequelize.Model {
        static initialize() {
            return this.init(config, settings)
        }

        static associate(models) {
            this.belongsTo(models.Users, {
                foreignKey: 'nickname'
            })
            this.belongsTo(models.Boards, {
                foreignKey: 'boardidx'
            })
        }
    }


    const config = {
        commentidx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        depth: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        party: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        register: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },

    }

    const settings = {
        sequelize,
    }

    Comments.initialize()

}