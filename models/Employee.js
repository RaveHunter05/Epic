const Sequelize= require('sequelize')
const db=require('../config/database')

const Employee = db.define('employee', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    names:{
        type:Sequelize.STRING
    },
    last_names:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    phone:{
        type:Sequelize.STRING
    },
    categories_id:{
        type:Sequelize.INTEGER,
        references:{
            model: Category,
            key:'id'
        }
    },
    pay_per_hour:{
        type:Sequelize.DOUBLE
    }
},{
    tableName: 'employees'
})

module.exports = Employee