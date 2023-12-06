const dbcontroller = require("./dbcontroller");
const axios = require('axios');


async function create_fetched(anime_name) {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${anime_name}`);
        if (!response) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        } else {
            const data = response.data.data[0];
            const name = data.title;
            const description = data.synopsis;
            const release_date = new Date().toISOString().split('T')[0];
            const global_rating = data.score;
            const streaming_platform = data.url;
            let image_url = "";
            if (data.images){
                image_url = data.images.jpg.image_url;
            }
            const AnimeModel = await dbcontroller.getModel('anime');
            const newAnime = await AnimeModel.create({
                name,
                description,
                release_date,
                global_rating,
                streaming_platform,
                image_url,
            });
            return newAnime;
        }
    } catch (e) {
        console.log(e);
    }
}

async function populateAnime() {
    for (let i = 0; i < 1000; i++) {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${i}`)
            if (!response) {
                continue;
            } else {
                const data = response.data.data;
                console.log(data);
                const name = data.title;
                const description = data.synopsis;
                const release_date = new Date().toISOString().split('T')[0];
                const global_rating = data.score;
                const streaming_platform = data.url;
                let image_url = "";
                if (data.images){
                    image_url = data.images.jpg.image_url;
                }
                const AnimeModel = await dbcontroller.getModel('anime');
                const newAnime = await AnimeModel.create({
                    name,
                    description,
                    release_date,
                    global_rating,
                    streaming_platform,
                    image_url,
                });
                console.log("Adicionando anime: " + name)
            }
        }
        catch (e) {
            continue;
        }
    }
}

module.exports = {create_fetched, populateAnime};
