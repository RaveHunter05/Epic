const Sequelize= require('sequelize')
const db=require('../config/database')

const Category = db.define('category', {
    category_name:{
        type:Sequelize.STRING
    }
},{
    tableName: 'categories',
    timestamps: false
}),
Employee = db.define('employee', {
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
    pay_per_hour:{
        type:Sequelize.DOUBLE
    }
},{
    tableName: 'employees',
    timestamps: false
}),
In_out = db.define('in_out', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
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
    },
    total_pay:{
        type:Sequelize.DOUBLE
    },
    total_horas:{
        type: Sequelize.INTEGER
    }
},{
    tableName: 'in_out',
    timestamps:false

}),
User = db.define('user', {
    username:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    role:{
        type:Sequelize.STRING
    },
    state:{
        type:Sequelize.BOOLEAN
    }
},{
    tableName: 'users',
    timestamps:false

})

// Por lo visto hay 2 modos de poner llaves foraneas, el primero es con
// llaves foraneas especificandolas dentro del objeto, el segundo es este de abajo
// especificando hasOne, hasMany, etc, creo que las 2 funcionan

Employee.hasMany(In_out, {
    foreignKey:'employees_id'
},{
    onDelete: 'cascade'
})

In_out.belongsTo(Employee,
    {
        foreignKey: 'employees_id'
    },
    {
        onDelete: 'cascade'
    })
    
Category.hasMany(Employee,{
    foreignKey: 'categories_id'
},
{
    onDelete: 'cascade'
})
Employee.belongsTo(Category, 
    {foreignKey: 'categories_id'},
    {
        onDelete: 'cascade'
    })
Employee.hasOne(User, {
    foreignKey: 'employees_id'
}, {
    onDelete: 'cascade'
})

User.belongsTo(Employee, 
    {foreignKey: 'employees_id'},{
        onDelete: 'cascade'
    })



module.exports={Category,Employee,In_out,User}