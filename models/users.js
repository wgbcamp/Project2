module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      noOfPosts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }

    });
    return Users;
  };
  