const dbcontroller = require("../dbcontroller");
const UserSchema = require("../models/user");

function addAnimeToDatabase(userId, anime) {
	UserSchema.findOneAndUpdate(
		{ _id: userId },
		{ $push: { anime_list: anime } },
		{ new: true },
		(err, user) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`Added anime ${anime} to user ${userId}`);
			}
		}
	);
}

function removeAnimeFromDatabase(userId, anime) {
	UserSchema.findOneAndUpdate(
		{ _id: userId },
		{ $pull: { anime_list: anime } },
		{ new: true },
		(err, user) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`Removed anime ${anime} from user ${userId}`);
			}
		}
	);
}

module.exports = {addAnimeToDatabase, removeAnimeFromDatabase}