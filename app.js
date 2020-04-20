const express= require('express')
const exp= require('express-handlebars')
const bodyParser= require('body-parser')
const path=require('path')

//Database configuration
const db=require('./config/database')

//Test de autentificacion
db.authenticate()
.then(()=>console.log('Connected'))
.catch(err => console.log('There was an error', err))

const app=express()


//Body parser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Index route

app.get('/', (req,res)=>{
    res.send('Hola mundo')
})

app.use('/emps', require('./routes/emps'))

const PORT= process.env.PORT || 5000

app.listen(PORT, console.log(`Server started at port ${PORT}`))


