'use strict';

const path      = require('path');
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';

module.exports = (config) => {
    config = config[env];

    return (modelPaths, services, options) => {
        let db = {};
        let sequelize;

        if (config.use_env_variable) {
            sequelize = new Sequelize(process.env[config.use_env_variable]);
        } else {
            sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

        modelPaths.forEach(modelPath => {
            let model = require(path.resolve(modelPath))(sequelize, Sequelize, services, options);
            db[model.name] = model;
        });

        Object.keys(db).forEach(function(modelName) {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        return db;
    };
};