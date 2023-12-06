const dbcontroller = require("../dbcontroller");
const User = require("../models/user");

async function register(req, res) {
	try{
		const username = req.body.username;
		const password = req.body.password;
		const email = req.body.email;
		const UserModel = await dbcontroller.getModel("user");
		const user = await UserModel.findOne({$or: [{username}, {email}]});
		if (user) {
			res.status(400);
			res.send({error: "Esse usuário já existe!"});
		} else {
			const newUser = await UserModel.create({username, email, password});
			res.status(200);
			res.send({user_id: newUser.id});
		}
	} catch(e){
		res.status(500);
		res.send({error: "Não foi possível registrar o usuário"});
	}
}

async function login(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
	try{
		res.status(200);
		res.send({message: "Login efetuado com sucesso!"});
	}
	catch (e){
		res.status(500);
		res.send({error: "Não foi possível efetuar o login"});
	}
	
}

module.exports = {register, login}