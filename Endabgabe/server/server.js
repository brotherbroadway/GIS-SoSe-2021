"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbgabeEnd = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
// interfaces taken from interface.d.ts
var AbgabeEnd;
(function (AbgabeEnd) {
    let port = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8080 (localhost:8080 for testing)
        port = 8100;
    let databaseUrl = "mongodb+srv://epicUser:gaminggaming@superomegaepicgis.gadfy.mongodb.net"; // the mongodb url
    // Mongo Collections setup
    let dbUserCollection;
    let dbRecipeCollection;
    startServer(port); // starts server with assigned port
    function startServer(_port) {
        let server = Http.createServer(); // creates server 
        console.log("Starting server"); // logs server start in console
        server.addListener("request", handleRequest); // creates listener on server request/changes
        server.addListener("listening", handleListen); // creates listener for server listening
        server.listen(port); // creates listener on specific port
    }
    connectDB(databaseUrl);
    function handleListen() {
        console.log("Listening"); // logs listening in console
    }
    async function handleRequest(_request, _response) {
        console.log("Request received."); // logs received request
        console.log(_request.url); // returns url of the request to console
        _response.setHeader("content-type", "text/html; charset=utf-8"); // declares server response type to be in text/html
        _response.setHeader("Access-Control-Allow-Origin", "*"); // response access unrestricted
        if (_request.url) {
            let myURL = Url.parse(_request.url, true);
            let chosenPath = myURL.pathname; // stores pathname in string
            // checks if /html or /json path was chosen
            if (chosenPath == "/userRegister") { // path used when button is pressed to send data to the database
                console.log("Registering user...");
                let nameReg = myURL.query["username"];
                let pwReg = myURL.query["password"];
                // checks if user is already in database (if there is already 1)
                let dbUserRegistry = await dbUserCollection.find({ "username": nameReg.toString() }).limit(1).count(true);
                if (dbUserRegistry == 1) { // if user already exists, registration fails
                    _response.write("UserFail");
                    console.log("Failed registration. User already exists.");
                }
                else { // if user doesn't exist already, creates a new one
                    dbUserCollection.insertOne({ "username": nameReg, "password": pwReg });
                    _response.write("UserSuccess");
                    console.log("Succesfully registered a new user!");
                }
            }
            else if (chosenPath == "/userLogin") { // path used when button is pressed to show data from the database
                console.log("Logging user in...");
                let nameLogin = myURL.query["username"];
                let pwLogin = myURL.query["password"];
                // checks if username & password match (if there's 1 matching)
                let dbUserRegistry = await dbUserCollection.find({ "username": nameLogin, "password": pwLogin }).limit(1).count(true);
                if (dbUserRegistry == 1) { // if user exists, logs user in
                    _response.write(JSON.stringify({ username: nameLogin, password: pwLogin }));
                    console.log("Succesfully logged user in!");
                }
                else { // if username/password don't match, fails to log in
                    _response.write("UserFail");
                    console.log("Failed login. User doesn't exist.");
                }
            }
            else if (chosenPath == "/recipesAll") {
                console.log("Loading all recipes...");
                let findAllCursor = dbRecipeCollection.find();
                let resultAll = await findAllCursor.toArray();
                console.log("Recipes found!");
                _response.write(JSON.stringify(resultAll));
            }
            else if (chosenPath == "/recipesMy") {
                console.log("Loading my recipes...");
                let recipesMine;
                recipesMine = await dbRecipeCollection.find({ "recipeAuthor": myURL.query.loggedUser }).toArray();
                console.log("Recipes found!");
                _response.write(JSON.stringify(recipesMine));
            }
            else if (chosenPath == "/recipeSave") {
                let testEdit = myURL.query["originName"];
                let dbRecEdit = await dbRecipeCollection.find({ "recipeName": testEdit }).limit(1).count(true);
                if (dbRecEdit == 1) {
                    console.log("Editing recipe...");
                    // console.log(myURL.query);
                    let queryEdit = JSON.stringify(myURL.query);
                    let qEdit = queryEdit.split(',"originName')[0];
                    qEdit += "}";
                    // console.log(qEdit);
                    let editedQuery = JSON.parse(qEdit);
                    dbRecipeCollection.findOneAndReplace({ "recipeName": testEdit }, editedQuery);
                    console.log("Recipe edited!");
                }
                else {
                    console.log("Saving recipe...");
                    dbRecipeCollection.insertOne(myURL.query);
                    console.log("Recipe saved!");
                }
            }
            else if (chosenPath == "/recipeDel") {
                console.log("Deleting recipe...");
                dbRecipeCollection.findOneAndDelete({ "recipeName": myURL.query.recipeName });
                _response.write("Recipe deleted!");
            }
            else if (chosenPath == "/recipesAllFav") {
                console.log("Loading your favorite recipes...");
                let thatUser = await dbUserCollection.findOne({ "username": myURL.query.loggedUser.toString() });
                let thoseFavs = thatUser.favRecipes;
                console.log("User: " + thatUser.username + "| Favs: " + JSON.stringify(thoseFavs));
                if (thoseFavs != undefined) {
                    _response.write(JSON.stringify(thoseFavs));
                }
                else {
                    _response.write("FavFail");
                }
            }
            else if (chosenPath == "/recipeFav") {
                console.log("Favoriting recipe...");
                let newFav = await dbRecipeCollection.findOne({ "_id": new Mongo.ObjectId(myURL.query._id.toString()) });
                let checkFav = await dbUserCollection.findOne({ "favRecipes": [myURL.query._id.toString()] });
                let allFavs = new Array();
                let userReg = await dbUserCollection.findOne({ "username": myURL.query.crntUser });
                // to check if recipe is already fav'd
                let dbRecipeCheck = await dbUserCollection.find({ "username": myURL.query.crntUser.toString(), "favRecipes": [checkFav] }).limit(1).count(true);
                console.log(newFav);
                if (dbRecipeCheck == 1) {
                    console.log("Failed. Recipe already favorited.");
                    _response.write("FailFav");
                }
                else { // if not, adds it to user's favorite recipes
                    let userUpdatedReg;
                    allFavs = userReg.favRecipes;
                    if (allFavs != undefined) {
                        allFavs.push(newFav);
                        userUpdatedReg = await dbUserCollection.findOneAndUpdate({ "username": myURL.query.crntUser }, { $set: { "favRecipes": allFavs } });
                    }
                    else {
                        userUpdatedReg = await dbUserCollection.findOneAndUpdate({ "username": myURL.query.crntUser }, { $set: { "favRecipes": [newFav] } });
                    }
                    console.log("Entire user data: " + JSON.stringify(userUpdatedReg));
                    _response.write("User '" + myURL.query.crntUser + "' added recipe '" + newFav.recipeName + "' added to their favorites.");
                }
            }
        }
        // _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }
    async function connectDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let dbClient = new Mongo.MongoClient(databaseUrl, options);
        await dbClient.connect(); // connects to mongo client
        dbUserCollection = dbClient.db("Recipes").collection("UserReg"); // checks registered user collection
        dbRecipeCollection = dbClient.db("Recipes").collection("AllRecipes"); // checks all recipes collection
        if (dbUserCollection != undefined) {
            console.log("Connection to 'UserReg' established.");
        }
        else
            console.log("Connection to 'UserReg' could not be established.");
        if (dbRecipeCollection != undefined) {
            console.log("Connection to 'AllRecipes' established.");
        }
        else
            console.log("Connection to 'AllRecipes' could not be established.");
    }
})(AbgabeEnd = exports.AbgabeEnd || (exports.AbgabeEnd = {}));
//# sourceMappingURL=server.js.map