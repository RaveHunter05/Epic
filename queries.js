const Pool=require('pg').Pool;
const pool=new Pool({
	user: 'ravehunter05',
	host: 'localhost',
	database: 'proyecto_jose',
	password: 'tumadreen4951',
	port: ''
});

const getUsers = (request, response)=>{
	pool.query('select * from usuario', (error, results)=>{
	if(error){
	throw error;
}
	response.status(200).json(results.rows);
})
}

module.exports={getUsers};
