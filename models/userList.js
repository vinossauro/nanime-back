const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserListSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: "User"},
	animes: [{type: Schema.Types.ObjectId, ref: "Anime"}]
})

module.exports = mongoose.model("userList", UserListSchema)