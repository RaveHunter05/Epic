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

router.get('/user-employees-nombre/:nombre', (req,res)=>{
    let {nombre}= req.params
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

// Seleccionar empleados por categoria 

router.get('/colaboradores-categoria/:category_name', (req,res)=>{
    let {category_name}= req.params
    Employee.findAll({
        include:[{
            model: Category,
            where : {
                category_name
            }
        }]
    })
    .then(response=>{
        res.json({'response': response})
    })
})

// Seleccionar empleados por nombre

router.get('/colaboradores-nombre/:names', (req,res)=>{
    let {names}= req.params
    Employee.findAll({
        where:{
            names
        },
        include: [{
            model: Category
        }]
    })
    .then(response=>{
        res.json({'respuesta: ': response})
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
    let {check_in_time, employees_id} = req.body
    In_out.create({
        check_in_time,
        employees_id
    })
    .then(response=> res.json({'respuesta: ': response}))
    .catch(err=> console.log('There was an error: ', err))
})

//Ingresar salidas
// Aqui hace un update en salida
// Este es el mas importante, aqui deberia calcularse las horas totales
// el pago total y luego llenarlo en la tabla

// router.put('/create-out', (req,res)=>{
//     let {id, employees_id, departure_time} = req.body;
//     In_out.update({departure_time}, {
//         where:{
//             id
//         }
//     })
//     .then(()=>{
//         In_out.findAll({
//             attributes: ['check_in_time', 'departure_time'],
//             where:{
//                 id
//             }
//         })    
//         .then(response=> {
//             let {check_in_time,departure_time}= response[0]
//             let tiempo= (departure_time.valueOf() - check_in_time.valueOf()) / 3600000
//             res.json({'respuesta': tiempo})
//         })
//     })
    
// })


module.exports= router