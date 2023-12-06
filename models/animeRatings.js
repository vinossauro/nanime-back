const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AnimeRatingSchema = new Schema({
	user_id: {type: Schema.ObjectId, ref: "user", required: true},
	anime_id: {type: Schema.ObjectId, ref: "anime", required: true},
	rating: {type: Number, required: true}
})


module.exports = mongoose.model("animeRating", AnimeRatingSchema)