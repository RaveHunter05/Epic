const Sequelize= require('sequelize')
const db=require('../config/database')

const Pay = db.define('pay', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    employees_id: {
        type:Sequelize.INTEGER,
        references: {
            model:Employee,
            key:'id'
        }
    },
    start_date: {
        type:Sequelize.DATEONLY
    },
    end_date: {
        type:Sequelize.DATEONLY
    },
    pay: {
        type:Sequelize.DOUBLE
    }
},{
    tableName: 'pays'
})

module.exports = Pay