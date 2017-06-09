# mvc-express-sequelize

This is a [Sequelize](http://docs.sequelizejs.com/) model loader for [mvc-express](https://github.com/pajtai/mvc-express).

## Usage

```javascript
const config = require('../config');

const mvc = require('mvc-express');
const modelLoader = require('mvc-express-sequelize')(config);


mvc.boot({
    root: __dirname,
    modelLoader
})
```

## Config

The config object should include the following values for the current environment.

See the [Sequelize docs](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection#setting-up-a-connection)
for more info.

| Key | Description |
|----|----|
| username | The DB username |
| password | The DB password for the username |
| database | The DB name |
| host | The host to be used |
| dialect | The SQL DB type to be used by Sequelize |
| pool | Optional connection pool describtion |
| storage | For SQLLite only |

If you want Sequelize to use `process.env` to extract the configs, then use `{ use_env_variable : true }`.

## Creating models

Each model file will receive as arguments: `sequelize`, `DataType`, `services`, and `options`. 

Models are attached to the `models` object using the Sequelize model name.

Here is a sample model:

```javascript
// app/models/pages.model.js
// this model will be available as models.Pages
'use strict';

module.exports = function(sequelize, DataTypes, services, options) {
  var Pages = sequelize.define('Pages', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      title: {
          type: DataTypes.STRING
      },
      slug: {
          type: DataTypes.STRING
      },
      content: {
          type: DataTypes.TEXT
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pages;
};
```
