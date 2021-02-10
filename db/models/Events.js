const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Events", {
    
        organizer: {
          type: DataTypes.STRING(20),
          unique: true,
          validate:{ notContains: 'event'},
          
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          validate: {isEmail: true,  allowNull: false,  },// won't allow null
        },
        date: {
          type: DataTypes.DATE,
          validate:{isAfter: "2015-01-02", isDate:true ,} , // only allow date strings after a specific date
        },
        numOfSeats: {
            type: DataTypes.INTEGER,
            validate:{min: 2,},          // only allow values >= 23
          },
          bookedSeats: {
            type: DataTypes.INTEGER,
            validate:{ isGreater(value) {
                if (parseInt(value) > parseInt(numOfSeats)) {
                    throw new Error('bookedSeats must be less than numOfSeats');
                  }
              }}
          },
          startDate: {
            type: DataTypes.DATE,
            validate:{ canBeNull(value) {
                if (value === null && endDate !== null ) {
                    throw new Error('startDate cannot be null unless endDate is also null');
                  }
              }}
          },
          endDate: {
            type: DataTypes.DATE,
            validate:{ canBeNull(value) {
                if (value === null && startDate !== null ) {
                    throw new Error('endDate cannot be null unless startDate is also null');
                  }
              }}
          },
          image: {
            type: DataTypes.STRING,
            validate:{isUrl: true,allowNull: false},
          }
        

      },{
        timestamps: false
    }).init({ /* attributes */ }, {
      sequelize,
    
      // don't forget to enable timestamps!
      // timestamps: true,
    
      // I don't want createdAt
      createdAt: false,
    
      // I want updatedAt to actually be called updateTimestamp
      updatedAt: false
    });
     
  };

  