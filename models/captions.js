module.exports = function(sequelize, DataTypes) {
    var Captions = sequelize.define("Captions", {
      text: { 
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      noOfVotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      voter: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });
    Captions.associate = function(models) {
        // We're saying that a Caption should belong to 1 post
        Captions.belongsTo(models.Posts, {
          foreignKey: {
            allowNull: false
          }
        });
        Captions.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
        Captions.hasMany(models.Votes, {
            onDelete: "cascade"
        });
      };
      

    
    return Captions;
  };
  