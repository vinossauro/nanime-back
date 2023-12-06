const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimeSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: { type: String, required: false },
    release_date: { type: Date, required: true },
    global_rating: { type: Number, required: true, default: 0 },
    streaming_platform: { type: String, required: false },
    image_url: { type: String, required: false }
})

module.exports = mongoose.model("anime", AnimeSchema)