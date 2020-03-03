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
    Users.associate = function(models) {
      // Associating Users with Posts
      // When a User is deleted, also delete any associated Posts
      Users.hasMany(models.Posts, {
        onDelete: "cascade"
      });
      Users.hasMany(models.Votes, {
        onDelete: "cascade"
      });
      Users.hasMany(models.Captions, {
        onDelete: "cascade"
      })
    };
  
    return Users;
  };
  

