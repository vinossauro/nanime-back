const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	anime_list: [{type: Schema.ObjectId, ref: 'userList'}]
})

module.exports = mongoose.model("user", UserSchema)