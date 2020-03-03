module.exports = function(sequelize, DataTypes) {
    var Votes = sequelize.define("Votes", {
      // Boolean value that will always be set to true if a vote exists
      // We'll check for this in post requests to prevent making more than 1 vote on a caption
      // Let me know if we don't need this, I feel like I'm overlooking something
      voted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });
    Votes.associate = function(models) {
        // We're saying that a Vote should belong to a Post
        // A Vote can't be created without an associated Post due to the foreign key constraint
        Votes.belongsTo(models.Posts, {
          foreignKey: {
            allowNull: true
          }
        });
        Votes.belongsTo(models.Users,{
            foreignKey:{
            allowNull: true
            }
        });
        Votes.belongsTo(models.Captions,{
          foreignKey:{
            allowNull: true
          }
        })
      };
    return Votes;
  };
  

  // So basically, this table kind of 'inner joins' the other tables by their foreign keys.
  // Any time we vote it'll add the Post id, User id, and Caption id to this table 