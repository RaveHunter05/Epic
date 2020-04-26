const Sequelize= require('sequelize')

module.exports= new Sequelize('bd_epic_landscaping', 'Raven', 'elojodesauron123', {
    host:'138.197.111.216',
    dialect: 'mysql'
})