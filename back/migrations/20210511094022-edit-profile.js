'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        return Promise.all([
            queryInterface.addColumn(
                "Profiles",
                "id_image_profile",
                {
                    type: Sequelize.INTEGER,
                    onDelete: "CASCADE",
                    references: {
                        model: "Images",
                        key: "id",
                        as: "id_image_profile"
                    }
                }
            ),
            queryInterface.addColumn(
                "Profiles",
                "id_image_banner",
                {
                    type: Sequelize.INTEGER,
                    onDelete: "CASCADE",
                    references: {
                        model: "Images",
                        key: "id",
                        as: "id_image_banner"
                    }
                }
            )
        ])
    },

    down: async (queryInterface, Sequelize) => {

        return Promise.all([
            queryInterface.removeColumn(
                "Profiles",
                "id_image_profile"
            ),
            queryInterface.removeColumn(
                "Profiles",
                "id_image_banner"
            )
        ])
    }
};
