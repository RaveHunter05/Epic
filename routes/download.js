const express= require('express')
const router = express.Router()

const fs = require('fs')

router.get('/downloads',function(req,res){
    res.download("../Excel.xlsx");
    
    try {
        fs.unlink('../Excel.xlsx')
    } catch (error) {
        console.error(error)
    }

    console.log('Hola mundo')
});

module.exports = router