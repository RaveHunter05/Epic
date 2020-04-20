const Sequelize= require('sequelize')
const db=require('../config/database')

const In_out = db.define('in_out', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    date:{
        type:Sequelize.DATEONLY
    },
    check_in_time:{
        type:Sequelize.DATE
    },
    departure_time:{
        type:Sequelize.DATE
    },
    employees_id:{
        type:Sequelize.INTEGER,
        references:{
            model:Employee,
            key:'id'
        }
    }
},{
    tableName: 'categories'
})

module.exports = In_out