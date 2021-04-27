const handleSignin=(req, res, database, bcrypt)=>{
	const {email, password}=req.body;
	if(!email || !password){
		return res.status(400).json('Please fill form the correctly');
	}
	else{
		database.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data=>{
		const isValid=bcrypt.compareSync(password, data[0].hash);
		if(isValid){
			return database.select('*').from('users')
			.where('email', '=', email)
			.then(user=>{
				
				res.json(user[0])
			})
           .catch(err=>res.status(400).json('error logging in'))
		}
		else{
			 res.status(400).json('Wrong username or pasword')
		}
	})
	.catch(err=>res.status(400).json('Wrong username or pasword'))
}
	}
	

module.exports={
handleSignin:handleSignin
}