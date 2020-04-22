const express=require('express')
const router = express.Router()
const db = require('../config/database')
const {Category, Employee, In_out, User} = require('../models/Category')
const Sequelize= require('sequelize')

const Op=Sequelize.Op

// Seleccionar todas las categorias

router.get('/categories', (req,res)=>{
    Category.findAll()
    .then(categories =>{
        res.json({"respuesta: ": categories})
    })
    .catch(err=> console.log('there was an error', err))
})

// Crear categoria

router.post('/add-category', (req,res) => {
    console.log(req.body)
    let {category_name}=req.body
    Category.create({
        category_name
    })
    .then(categories=>{
        res.json({'respuesta': categories})
    })
    .catch(err=> console.log('There was an error adding', err))
})

// Seleccionar todos los empleados

router.get('/employees', (req,res) => {
    Employee.findAll()
    .then(employee=>{
        res.json({"respuesta: ": employee})
    })
})

// Seleccionar todos los empleados y sus categorias

router.get('/employees-categories', (req,res) => {
    Employee.findAll({
        include: [{
            model: Category
        }]
    })
    .then(employee=>{
        res.json({"respuesta: ": employee})
    })
    .catch(err=> res.json({'error: ': err}))
})

//Crear empleado

router.post('/add-employee', (req,res)=>{
    let {names, last_names, email, phone, categories_id, pay_per_hour} = req.body

    Employee.create({
        names,
        last_names,
        email,
        phone,
        categories_id,
        pay_per_hour
    })
    .then(response=> res.json({'respuesta: ': response}))
    .catch(err=> console.log('There was an error adding: ', err))
})

// Actualizar empleado

router.put('/employees', (req,res)=>{
    let {id, email, phone, pay_per_hour, categories_id } = req.body
    Employee.update({
        email, phone, pay_per_hour, categories_id
    }, {
        where:{
            id
        }
    })
    .then(response=>res.json({'respuesta: ': response}))
    .catch(err=> res.json({'error:': err}))
})

// Seleccionar todos los usuarios

router.get('/users', (req,res) =>{
    User.findAll()
    .then(users=> res.json({"respuesta: ": users}))
    .catch(err => console.log('There was an error: ', err))
})

// Seleccionar usuarios por nombre

router.get('/user-nombre/:username', (req,res)=>{
    let {username}=req.params
    User.findAll({
        where:{
            username
        }
    })
    .then(users=>res.json({"respuesta: ": users}))
    .catch(err=> res.json({"There was an error: ": err}))
})

// Seleccionar usuarios por nombre

router.get('/usuer-employees-nombre/:nombre', (req,res)=>{
    let nombre= req.params.nombre
    User.findAll({
        include: [{
            model: Employee,
            where:{
                names: nombre
            }
        }]
    })
    .then(response=>{
        (response[0]==null) ? res.json({"error": "no hay usuarios con ese nombre"}): res.json({"datos":  response})
    })
})

// Seleccionar usuarios por tipo de usuario

router.get('/usuarios-rol/:rol', (req,res)=>{
    let rol= req.params.rol
    User.findAll({
        where:{
            role: rol
        },
        include: [{
            model: Employee
        }]
    })
    .then(response=>{
        (response[0]==null) ? res.json({"error": "no hay usuarios con ese rol"}): res.json({"datos":  response})
    })
})

// Actualizar usuario
router.put('/actualizar-usuario', (req,res)=>{
    let {id, username, password, role, state} =req.body
    User.update({username, password, role, state}, {
        where:{
            id
        }
    })
    .then(response=> res.json({"respuesta: ": response}))
    .catch(err=> res.json({'error: ': err}))
})

// Seleccionar todos los colaboradores

router.get('/colaboradores', (req,res)=>{
    User.findAll({
        where:{
            state:1
        },
        include: [Employee]
    })
    .then(response=>res.json({"datos":  response}))
    .catch(err=> console.log('error aqui alv', err))
})

// Seleccionar colaboradores por categoria 

router.get('/colaboradores-categoria/:categoria', (req,res)=>{
    let categoria= req.params.categoria
    User.findAll({
        where:{
            state:1
        },
        include: [
            {model: Employee, 
                include: [{
                    model: Category,
                    where: {
                        category_name: categoria
                    }
                }]}
        ]
    })
    .then(response=>{
        (response[0]["employee"]==null) ? res.json({"error": "no hay empleados en esa categoria"}) : res.json({"datos": response})
    })
    
})

// Seleccionar colaboradores por nombre

router.get('/colaboradores-nombre/:nombre', (req,res)=>{
    let nombre= req.params.nombre
    User.findAll({
        where:{
            state:1
        },
        include: [{
            model: Employee,
            where:{
                names: nombre
            }
        }]
    })
    .then(response=>{
        (response[0]==null) ? res.json({"error": "no hay colaboradores con ese nombre"}): res.json({"datos":  response})
    })
})



// Crear usuario

router.post('/add-user', (req,res)=>{
    let {username, password, role,state, employees_id}=req.body

    User.create({
        username,
        password,
        role,
        state,
        employees_id
    })
    .then(()=> res.json({'respuesta: ': 'usuario agregado exitosamente'}))
    .catch(err=>console.log('There was an error adding user: ', err))
})

// Seleccionar todos los in out

router.get('/inout', (req,res) => {
    In_out.findAll()
    .then(inout=>{
        res.json({"respuesta: ": inout})
    })
    .catch(err => console.log('There was an error', err))
})

// Falta horas trabajadas en rango de fecha

// Ingresar entradas

router.post('/create-in', (req,res)=>{
    let {check_in_time, departure_time, employees_id} = req.body
    In_out.create({
        check_in_time,
        departure_time,
        employees_id
    })
    .then(response=> res.json({'respuesta: ': response}))
    .catch(err=> console.log('There was an error: ', err))
})

//Ingresar salidas
// Aqui hace un update en salida
// Este es el mas importante, aqui deberia calcularse las horas totales
// el pago total y luego llenarlo en la tabla

//Revisar esto
router.post('/create-out', (req,res)=>{
    let {id, departure_time, employees_id} = req.body
    return reparture_time
    let pago=0
    Employee.findAll({
        where: {
            id: employees_id
        },
        attributes: ['pay_per_hour']
    }).then(list=> pago = res.status(1).json(list))
    console.log(pago)
    return
    // Ingresa la hora de salida
    In_out.update({departure_time},{
        where:{
            id
        }
    }).then(()=>{
        res.redirect('/inout')
    }).catch(err=>console.log('There was an error', err))
    // Encuentra el pago que recibe ese usuario
    Employee.findAll({
        where: {
            id: employees_id
        },
        attributes: ['pay_per_hour']
    }).then(list=> pago = res.status(1).json(list))
    
    In_out.update({total_pay: pago},{
        where:{
            id
        }
    })
})


module.exports= router