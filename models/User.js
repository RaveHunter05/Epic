const Sequelize= require('sequelize')
const db=require('../config/database')

const User = db.define('user', {
    username:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    role:{
        type:Sequelize.STRING
    },
    employees_id:{
        type:Sequelize.INTEGER,
        references:{
            mode:Employee,
            key:'id'
        }
    },
    state:{
        type:Sequelize.BOOLEAN
    }
},{
    tableName: 'categories'
})

module.exports = User