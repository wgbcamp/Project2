module.exports = function(sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
      title: { 
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }, 
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        }
      },
      noOfVotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });
    Posts.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Posts.belongsTo(models.Users, {
          foreignKey: {
            allowNull: false
          }
        });
        Posts.hasMany(models.Votes, {
            onDelete: "cascade"
        });
      };
      

    
    return Posts;
  };
  