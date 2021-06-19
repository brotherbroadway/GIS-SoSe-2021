import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3_4Server {

    interface EpicForm { // Form entry as interface
        username: string;
        password: string;
        mostepic: string;
        coolno: number;
        essay: string;
    }

    let port: number | string | undefined = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8080 (localhost:8080 for testing)
        port = 8100;

    let databaseUrl: string = "mongodb+srv://dbTest:<qU1LFxBDxaUpD58E>@superomegaepicgis.gadfy.mongodb.net/GIS3_4?retryWrites=true&w=majority"; // the mongodb url

    startServer(port); // starts server with assigned port

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer(); // creates server 
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
            let epicEntry: EpicForm = {username: myURL.query.username + "", password: myURL.query.password + "", mostepic: myURL.query.mostepic + "", coolno: parseInt(myURL.query.coolno + ""), essay: myURL.query.essay + ""};
            // checks if /html or /json path was chosen
            if (chosenPath == "/send") { // path used when button is pressed to send data to the database
                let stringJSON: string = JSON.stringify(myURL.query);
                console.log(stringJSON);
                console.log(epicEntry);
                console.log("Connected to database.");
                saveMe(epicEntry);
                _response.write(JSON.stringify(epicEntry)); // writes response received from saveMe function
            } else if (chosenPath == "/show") { // path used when button is pressed to show data from the database
                _response.write(JSON.stringify(await checkDB())); // writes stringified data received from database
            }
        }

        // _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }

    async function saveMe(_formEntry: EpicForm): Promise <string> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let dbClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
        await dbClient.connect(); // connects to mongo client
        let dbCollection: Mongo.Collection = dbClient.db("GIS3_4").collection("EpicCollection"); // checks collection
        dbCollection.insertOne(_formEntry); // inserts entry into collection
        let dataResponse: string = "Entry entered."; // notifies user that entry has been entered
        return dataResponse;
    }

    async function checkDB(): Promise <EpicForm[]> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let dbClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
        await dbClient.connect(); // connects to mongo client
        let dbCollection: Mongo.Collection = dbClient.db("GIS3_4").collection("EpicCollection"); // checks collection
        let dbCursor: Mongo.Cursor = dbCollection.find(); // could also specify search with specific names and such
        let myDB: EpicForm[] = await dbCursor.toArray(); // receives data from database entry
        return myDB;
    }
}