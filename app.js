const express= require('express')
const exp= require('express-handlebars')
const bodyParser= require('body-parser')
const path=require('path')
const dotenv=require('dotenv').config()

const fs = require('fs')

//Database configuration
const db=require('./config/database')

//Test de autentificacion
db.authenticate()
.then(()=>console.log('Connected'))
.catch(err => console.log('There was an error', err))

const app = express()

//Body parser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Index route

app.get('/', (req,res)=>{
    res.send('Hola mundo')
})

app.use('/emps', require('./routes/emps'))

// const download = express()

// download.use('/download', require('./routes/download'))
app.get('/download',function(req,res){
    res.download("./Excel.xlsx");
    
    try {
        fs.unlink('../Excel.xlsx')
    } catch (error) {
        console.error(error)
    }
});

const PORT= process.env.PORT || 5000

app.listen(PORT, console.log(`Server started at port ${PORT}`))


