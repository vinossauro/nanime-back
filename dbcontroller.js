const mongoose = require("mongoose");

require("./models/anime")
require("./models/user")
require("./models/userList")
require("./models/animeRatings")

class dbController {
    async connectDatabase() {
        await mongoose.connect("mongodb+srv://nanime:naruto@cluster0.x7iwsff.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to the database")
    }

    async getModel(model) {
        if (mongoose.connection.readyState != 1) await this.connectDatabase()
        return mongoose.model(model)
      }
}

if (!global.dbController) {
    console.log("dbController instanciado")
    global.dbController = new dbController()
  }
  
  module.exports = global.dbController