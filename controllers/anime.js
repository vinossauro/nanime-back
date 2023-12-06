const dbcontroller = require("../dbcontroller")
const utils = require('../utils.js');


async function get_all_animes(req, res) {
	console.log("chamouuu");
    try {
        const AnimeModel = await dbcontroller.getModel("anime")
        const instances = await AnimeModel.find().limit(10); // Use the find method to get all instances
        res.status(200)
        res.send({animes: instances});
    }
    catch {
        res.status(500);
        res.send({ error: 'Não foi possível recuperar a lista de animes' });
    }
}

async function get_anime(req, res) {
    try {    
        const anime_id = req.params.id;
        const AnimeModel = await dbcontroller.getModel("anime");
        const anime = await AnimeModel.findOne({_id: anime_id});
        res.status(200);
        res.send({anime: anime});
    } catch (e) {
        res.status(404);
        res.send({error: "Não foi possível recuperar o anime"})
    }
}

async function populate_anime(req, res){
	utils.populateAnime();
}

async function search_anime(req, res) {
    try {
        let name = req.params.name;
        const AnimeModel = await dbcontroller.getModel("anime");
		name  = name.replace(/\b\w/g, match => match.toUpperCase());
        let anime = await AnimeModel.findOne({name: name});
        if (!anime) {
            anime = await utils.create_fetched(name);
        }
        res.status(200);
        res.send({anime: anime});
    } catch(e) {
        res.status(404)
        res.send({error: "Não foi possível encontrar este anime."})
    }
}

module.exports = {
    get_all_animes,
    get_anime,
    search_anime,
    delete_anime,
	populate_anime,
}

async function delete_anime(req, res) {
    try {
        const anime_id = req.params.id
        const AnimeModel = await dbcontroller.getModel("anime")
        const deletion = await AnimeModel.deleteOne({id: anime_id})
    }
    catch (e) {
        res.status(500)
        res.send({error: "Não foi possível deletar este anime."})
    }
}


// def get_all_anime():
//     anime = Anime.query.all()
//     result = []
//     for a in anime:
//         anime_data = {}
//         anime_data['id'] = a.id
//         anime_data['name'] = a.name
//         anime_data['description'] = a.description
//         anime_data['release_date'] = a.release_date.strftime('%Y-%m-%d')
//         anime_data['global_rating'] = a.global_rating
//         anime_data['streaming_platform'] = a.streaming_platform
//         anime_data['image_url'] = a.image_url  # Fix: Add image_url to the response
//         result.append(anime_data)
//     return jsonify(result)

// def get_anime(id):
//     anime = Anime.query.get(id)
//     if anime:
//         anime_data = {}
//         anime_data['id'] = anime.id
//         anime_data['name'] = anime.name
//         anime_data['description'] = anime.description
//         anime_data['release_date'] = anime.release_date.strftime('%Y-%m-%d')
//         anime_data['global_rating'] = anime.global_rating
//         anime_data['streaming_platform'] = anime.streaming_platform
//         anime_data['image_url'] = anime.image_url
//         return jsonify(anime_data)
//     else:
//         return jsonify({'message': 'Anime not found'})

// def create_anime(new_anime):
//     db.session.add(new_anime)
//     db.session.commit()
//     return jsonify({'message': 'Anime created successfully'})

// def update_anime(id):
//     anime = Anime.query.get(id)
//     if anime:
//         data = request.get_json()
//         anime.name = data['name']
//         anime.description = data['description']
//         anime.release_date = data['release_date']
//         anime.global_rating = data['global_rating']
//         anime.streaming_platform = data['streaming_platform']
//         db.session.commit()
//         return jsonify({'message': 'Anime updated successfully'})
//     else:
//         return jsonify({'message': 'Anime not found'})

// def delete_anime(id):
//     anime = Anime.query.get(id)
//     if anime:
//         db.session.delete(anime)
//         db.session.commit()
//         return jsonify({'message': 'Anime deleted successfully'})
//     else:
//         return jsonify({'message': 'Anime not found'})

// if __name__ == '__main__':
//     db.create_all()
//     app.run(debug=True)

// def search_anime(anime_name):
//     print(anime_name)
//     print("blablabla")
//     anime = Anime.query.filter_by(name=anime_name).first()
//     if anime:
//         return render_template("home.html", anime = anime)
//     else:
//         # Search from Jikan API
//         response = requests.get(f'https://api.jikan.moe/v4/anime?q={anime_name}')
//         if response.status_code == 200:
//             anime_data = response.json()
//             if anime_data['data'][0]:
//                 anime_info = anime_data['data'][0]
//                 name = anime_info['title']
//                 description = anime_info['synopsis']
//                 release_date = date.today()
//                 global_rating = anime_info['score']
//                 streaming_platform = anime_info['url']
//                 image_url = anime_info['images']['jpg']['image_url']
                
//                 new_anime = Anime(name=name, description=description, release_date=release_date,
//                                   global_rating=global_rating, streaming_platform=streaming_platform,
//                                   image_url=image_url)
//                 create_anime(new_anime) 
//                 return render_template("home.html", anime = new_anime)
//             else:
//                 return render_template("home.html", anime = new_anime)
//         else:
//             return render_template("home.html", anime = new_anime)


// def add_anime(user_id, anime_id):
//     user = user.User.query.get(user_id)
//     anime = Anime.query.get(anime_id)

//     if user and anime:
//         user_anime_entry = anime.UserAnimeList(user_id=user.id, anime_id=anime.id)
//         db.session.add(user_anime_entry)
//         db.session.commit()
    
//     return redirect(url_for('users', user_id=user.id))