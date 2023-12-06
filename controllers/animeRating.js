const dbcontroller = require("../dbcontroller");


const createRating = (userId, anime_name, rating) => {
	
	dbcontroller.createRating(userId, animeId, rating);
};

const updateRating = (userId, anime_name, rating) => {
	
	dbcontroller.updateRating(userId, animeId, rating);
};


const deleteRating = (userId, anime_name) => {
	
	dbcontroller.deleteRating(userId, animeId);
};

module.exports = {createRating, updateRating, deleteRating}

