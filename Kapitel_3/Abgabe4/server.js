"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_4Server;
(function (P_3_4Server) {
    let port = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8080 (localhost:8080 for testing)
        port = 8100;
    let databaseUrl = "mongodb+srv://epicUser:<gamingamingaming>@superomegaepicgis.gadfy.mongodb.net/GIS3_4?retryWrites=true&w=majority"; // the mongodb url
    startServer(port); // starts server with assigned port
    function startServer(_port) {
        let server = Http.createServer(); // creates server 
        console.log("Starting server"); // logs server start in console
        server.addListener("request", handleRequest); // creates listener on server request/changes
        server.addListener("listening", handleListen); // creates listener for server listening
        server.listen(port); // creates listener on specific port
    }
    /*
    // From prof's video
    connectToDatabase(databaseUrl);

    async function connectToDatabase(_url: string): Promise <void> {
        let orders: Mongo.Collection;
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("CocktailBar").collection("Orders");
        console.log("Database connection ", orders != undefined);
    }*/
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
            let epicEntry = { username: myURL.query.username + "", password: myURL.query.password + "", mostepic: myURL.query.mostepic + "", coolno: parseInt(myURL.query.coolno + ""), essay: myURL.query.essay + "" };
            // checks if /html or /json path was chosen
            if (chosenPath == "/send") { // path used when button is pressed to send data to the database
                let stringJSON = JSON.stringify(myURL.query);
                console.log(stringJSON);
                console.log(epicEntry);
                console.log("Connected to database.");
                saveMe(epicEntry);
                _response.write(JSON.stringify(epicEntry)); // writes response received from saveMe function
            }
            else if (chosenPath == "/show") { // path used when button is pressed to show data from the database
                _response.write(JSON.stringify(await checkDB())); // writes stringified data received from database
            }
        }
        // _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }
    async function saveMe(_formEntry) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let dbClient = new Mongo.MongoClient(databaseUrl, options);
        await dbClient.connect(); // connects to mongo client
        console.log("Entered database.");
        let dbCollection = dbClient.db("GIS3_4").collection("EpicCollection"); // checks collection
        console.log("Entry saved.");
        dbCollection.insertOne(_formEntry); // inserts entry into collection
    }
    async function checkDB() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let dbClient = new Mongo.MongoClient(databaseUrl, options);
        await dbClient.connect(); // connects to mongo client
        let dbCollection = dbClient.db("GIS3_4").collection("EpicCollection"); // checks collection
        let dbCursor = dbCollection.find(); // could also specify search with specific names and such
        let myDB = await dbCursor.toArray(); // receives data from database entry
        return myDB;
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=server.js.map