import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
// interfaces taken from interface.d.ts

export namespace AbgabeEnd {

    let port: number | string | undefined = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8080 (localhost:8080 for testing)
        port = 8100;

    let databaseUrl: string = "mongodb+srv://epicUser:gaminggaming@superomegaepicgis.gadfy.mongodb.net"; // the mongodb url

    // Mongo Collections setup
    let dbUserCollection: Mongo.Collection;
    let dbRecipeCollection: Mongo.Collection;

    startServer(port); // starts server with assigned port

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer(); // creates server 
        console.log("Starting server"); // logs server start in console
        server.addListener("request", handleRequest); // creates listener on server request/changes
        server.addListener("listening", handleListen); // creates listener for server listening
        server.listen(port); // creates listener on specific port
    }

    connectDB(databaseUrl);

    function handleListen(): void {
        console.log("Listening"); // logs listening in console
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise <void> { // checks for incoming request and server response
        console.log("Request received."); // logs received request
        console.log(_request.url); // returns url of the request to console
        _response.setHeader("content-type", "text/html; charset=utf-8"); // declares server response type to be in text/html
        _response.setHeader("Access-Control-Allow-Origin", "*"); // response access unrestricted

        if (_request.url) {
            let myURL: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let chosenPath: string = <string> myURL.pathname; // stores pathname in string
            // checks if /html or /json path was chosen
            if (chosenPath == "/userRegister") { // path used when button is pressed to send data to the database
                console.log("Registering user...");
                let nameReg: string = <string> myURL.query["username"];
                let pwReg: string = <string> myURL.query["password"];
                // checks if user is already in database (if there is already 1)
                let dbUserRegistry: number = await dbUserCollection.find({"username": nameReg.toString()}).limit(1).count(true);

                if (dbUserRegistry == 1) { // if user already exists, registration fails
                    _response.write("UserFail");
                    console.log("Failed registration. User already exists.");
                } else if (myURL.query["username"] != null) {
                    if (myURL.query["password"] != null) { // if user doesn't exist already, creates a new one
                        dbUserCollection.insertOne({"username": nameReg, "password": pwReg});
                        _response.write("UserSuccess");
                        console.log("Succesfully registered a new user!");
                    }
                } else {
                    _response.write("UserFail");
                    console.log("Failed registration. User already exists.");
                }
                _response.write("UserFail");
                console.log("Failed registration. User doesn't exist.");

            } else if (chosenPath == "/userLogin") { // path used when button is pressed to show data from the database
                console.log("Logging user in...");
                let nameLogin: string = <string> myURL.query["username"];
                let pwLogin: string = <string> myURL.query["password"];
                // checks if username & password match (if there's 1 matching)
                let dbUserRegistry: number = await dbUserCollection.find({"username": nameLogin, "password": pwLogin}).limit(1).count(true);

                if (dbUserRegistry == 1) { // if user exists, logs user in
                    if (myURL.query["username"] != null) {
                        if (myURL.query["password"] != null) {
                            _response.write("UserSuccess");
                            console.log("Succesfully logged user in!");
                        }
                    }
                    // _response.write(JSON.stringify({username: nameLogin, password: pwLogin}));
                } else { // if username/password don't match, fails to log in
                    _response.write("UserFail");
                    console.log("Failed login. User doesn't exist.");
                }
            } else if (chosenPath == "/recipesAll") { // when allRecipes page is being loaded
                console.log("Loading all recipes...");
                let findAllCursor: Mongo.Cursor = dbRecipeCollection.find();
                let resultAll: RecipeForm[] = await findAllCursor.toArray();
                console.log("Recipes found!");
                _response.write(JSON.stringify(resultAll));
            } else if (chosenPath == "/recipesMy") { // when myRecipes page is being loaded
                console.log("Loading my recipes...");
                let recipesMine: RecipeForm[];
                recipesMine = await dbRecipeCollection.find({"recipeAuthor": myURL.query.loggedUser}).toArray();
                console.log("Recipes found!");
                _response.write(JSON.stringify(recipesMine));
            } else if (chosenPath == "/recipeSave") { // when a recipe is being created
                let testEdit: string = <string> myURL.query["originName"];
                let dbRecEdit: number = await dbRecipeCollection.find({"recipeName": testEdit}).limit(1).count(true);
                if (dbRecEdit == 1) { // for editing a recipe
                    console.log("Editing recipe...");
                    // console.log(myURL.query);
                    let queryEdit: string = <string> JSON.stringify(myURL.query);
                    let qEdit: string = <string> queryEdit.split(',"originName')[0];
                    qEdit += "}";
                    // console.log(qEdit);
                    let editedQuery: Url.UrlWithParsedQuery = <Url.UrlWithParsedQuery> JSON.parse(qEdit);
                    dbRecipeCollection.findOneAndReplace({"recipeName": testEdit}, editedQuery);
                    console.log("Recipe edited!");
                } else { // for regular submitting
                    console.log("Saving recipe...");
                    dbRecipeCollection.insertOne(myURL.query);
                    console.log("Recipe saved!");
                }
            } else if (chosenPath == "/recipeDel") { // deleting a created recipe
                console.log("Deleting recipe...");
                dbRecipeCollection.findOneAndDelete({"recipeName": myURL.query.recipeName});
                _response.write("Recipe deleted!");
            } else if (chosenPath == "/recipesAllFav") { // when favRecipes is being loaded
                console.log("Loading your favorite recipes...");
                let thatUser: UserRegForm = await dbUserCollection.findOne({"username": myURL.query.loggedUser.toString()});
                let thoseFavs: RecipeForm[] = thatUser.favRecipes;
                console.log("User: " + thatUser.username + "| Favs: " + JSON.stringify(thoseFavs));
                if (thoseFavs != undefined) {
                    _response.write(JSON.stringify(thoseFavs));
                } else {
                    _response.write("FavFail");
                }
            } else if (chosenPath == "/recipeFav") { // when favoriting a recipe in the allRecipes page
                console.log("Favoriting recipe...");
                let newFav: RecipeForm = await dbRecipeCollection.findOne({"_id": new Mongo.ObjectId(myURL.query._id.toString())});
                let allFavs: RecipeForm[] = new Array();
                let userReg: UserRegForm = await dbUserCollection.findOne({"username": myURL.query.crntUser.toString()});
                // to check if recipe is already fav'd
                let dbRecipeCheck: number = await dbUserCollection.find({"username": myURL.query.crntUser.toString(), "favRecipes": [newFav]}).count(true);
                if (dbRecipeCheck < 1) {
                    let userUpdatedReg: Mongo.FindAndModifyWriteOpResultObject <UserRegForm>;
                    allFavs = userReg.favRecipes;
                    if (allFavs != undefined) { // if this is the first recipe favorited
                        allFavs.push(newFav);
                        userUpdatedReg = await dbUserCollection.findOneAndUpdate({"username": myURL.query.crntUser}, {$set: {"favRecipes": allFavs}});
                    } else { // or just another one favorited
                        userUpdatedReg = await dbUserCollection.findOneAndUpdate({"username": myURL.query.crntUser}, {$set: {"favRecipes": [newFav]}});
                    }
                    console.log("Entire user data: " + JSON.stringify(userUpdatedReg));
                    _response.write("User '" + myURL.query.crntUser + "' added recipe '" + newFav.recipeName + "' added to their favorites.");
                } else {// if not, send failed request
                    console.log("Failed. Recipe already favorited.");
                    _response.write("FailFav");
                }
            } else if (chosenPath == "/recipeFavDel") { // deleting a favorited recipe on the favRecipes page
                console.log("Deleting a favorite...");
                let userReg: UserRegForm = await dbUserCollection.findOne({"username": myURL.query.crntUser.toString()});
                let prevFav: RecipeForm[];
                console.log(myURL.query);
                prevFav = userReg.favRecipes;
                let delRecipeName: string;

                for (let i: number = 0; i < prevFav.length; i++) { // removing said recipe
                    if (myURL.query._id == prevFav[i]._id) {
                        delRecipeName = prevFav[i].recipeName;
                        prevFav.splice(i, 1);
                    }
                }
                dbUserCollection.findOneAndUpdate({"username": myURL.query.crntUser}, {$set: {"favRecipes": prevFav}});
                _response.write(delRecipeName + "successfully deleted.");
            }
        }

        // _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }

    // connecting to the MongoDB function
    async function connectDB(_url: string): Promise <void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let dbClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
        await dbClient.connect(); // connects to mongo client
        dbUserCollection = dbClient.db("Recipes").collection("UserReg"); // checks registered user collection
        dbRecipeCollection = dbClient.db("Recipes").collection("AllRecipes"); // checks all recipes collection
        if (dbUserCollection != undefined) {
            console.log("Connection to 'UserReg' established.");
        } else console.log("Connection to 'UserReg' could not be established.");
        if (dbRecipeCollection != undefined) {
            console.log("Connection to 'AllRecipes' established.");
        } else console.log("Connection to 'AllRecipes' could not be established.");
    }
}