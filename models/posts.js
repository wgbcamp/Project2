module.exports = function(sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
      title: { 
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      totalVotes: {
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
            allowNull: true
          }
        });
        Posts.hasMany(models.Captions, {
            onDelete: "cascade"
        });
      };
      // Let's not associate this table with votes
      // Let's just calculate the votes by adding up the total caption votes of a post in frontend javascript
      

    
    return Posts;
  };
  