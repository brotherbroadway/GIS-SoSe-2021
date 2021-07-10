import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_EndServer {

    interface UserRegForm { // User login/register form entry as interface
        username: string;
        password: string;
    }
    
    let port: number | string | undefined = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8080 (localhost:8080 for testing)
        port = 8100;

    let databaseUrl: string = "mongodb+srv://epicUser:gaminggaming@superomegaepicgis.gadfy.mongodb.net"; // the mongodb url

    // User Login setup
    //let dbUserRegistryAll: UserRegForm[];
    let dbUserNew: UserRegForm;
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
                // dbUserRegistryAll = await dbUserCollection.find().toArray();
                let nameReg: string = <string> myURL.query["username"];
                let pwReg: string = <string> myURL.query["password"];
                let dbUserRegistry: number = await dbUserCollection.find({"username": nameReg.toString()}).limit(1).count(true);
                // let userRegEntry: UserRegForm = {username: nameReg + "", password: pwReg + ""};
                // let existingReg: boolean = false;

                if (dbUserRegistry == 1) {
                    _response.write("UserFail");
                    console.log("Failed registration. User already exists.");
                } else {
                    dbUserCollection.insertOne({"username": nameReg, "password": pwReg});
                    _response.write("UserSuccess");
                    console.log("Succesfully registered a new user!");
                }

                /*for (let i: number = 0; i < dbUserRegistryAll.length; i++) { // checks if registered user already exists
                    if (userRegEntry.username == dbUserRegistryAll[i].username) {
                        existingReg = true;
                    }
                }
                if (existingReg == false) { // if user doesn't exist already, creates new user
                    dbUserCollection.insertOne({"username": nameReg, "password": pwReg});
                    _response.write("UserSuccess");
                    console.log("Succesfully registered a new user!");
                } else { // if user exists already, return failed registration
                    _response.write("UserFail");
                    console.log("Failed registration. User already exists.");
                }*/

            } else if (chosenPath == "/userLogin") { // path used when button is pressed to show data from the database
                console.log("Logging user in...");
                // dbUserRegistryAll = await dbUserCollection.find().toArray();
                let nameLogin: string = <string> myURL.query["username"];
                let pwLogin: string = <string> myURL.query["password"];
                let dbUserRegistry: number = await dbUserCollection.find({"username": nameLogin, "password": pwLogin}).limit(1).count(true);
                if (dbUserRegistry == 1) {
                    _response.write(JSON.stringify(dbUserNew));
                    console.log("Succesfully logged user in!");
                } else {
                    _response.write("UserFail");
                    console.log("Failed login. User doesn't exist.");
                }
                /*let confirmedName: boolean = false;
                let confirmedPW: boolean = false;

                for (let i: number = 0; i < dbUserRegistryAll.length; i++) { // checks if username & password exist in database collection
                    if (dbUserRegistryAll[i].username == nameLogin) {
                        confirmedName = true;
                        if (dbUserRegistryAll[i].password == pwLogin) {
                        confirmedPW = true;
                        dbUserNew = {username: nameLogin, password: pwLogin};
                        }
                    }
                }
                if ((confirmedName == true) && (confirmedPW == true)) { // if username & password match to entry, logs them in
                    _response.write(JSON.stringify(dbUserNew));
                    console.log("Succesfully logged user in!");
                } else { // else spits out error
                    _response.write("UserFail");
                    console.log("Failed login. User doesn't exist.");
                }
                confirmedName = false;
                confirmedPW = false;*/
            }
        }

        // _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }

    async function connectDB(_url: string): Promise <void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let dbClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
        await dbClient.connect(); // connects to mongo client
        dbUserCollection = dbClient.db("Recipes").collection("UserReg"); // checks registered user collection
        dbRecipeCollection = dbClient.db("Recipes").collection("AllRecipes"); // checks all recipes collection
        console.log("Connection to UserReg", dbUserCollection != undefined);
        console.log("Connection to AllRecipes", dbRecipeCollection != undefined);
    }
}