module.exports = function(sequelize, DataTypes) {
    var Votes = sequelize.define("Votes", {
        
    

    });
    Votes.associate = function(models) {
        // We're saying that a Vote should belong to a Post
        // A Vote can't be created without an associated Post due to the foreign key constraint
        Votes.belongsTo(models.Posts, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    Votes.associate = function(models) {
        // We're saying that a Vote should also belong to a User
        // A Vote can't be created without a User due to the foreign key constraint
        Votes.belongsTo(models.Users, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Votes;
  };
  