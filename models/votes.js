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
        Votes.belongsTo(models.Users,{
            foreignKey:{
            allowNull: false
            }
        });
        Votes.belongsTo(models.Captions,{
          foreignKey:{
            allowNull: false
          }
        })
      };
    return Votes;
  };
  

  // So basically, this table kind of 'inner joins' the other tables by their foreign keys.
  // Any time we vote it'll add the Post id, User id, and Caption id to this table 