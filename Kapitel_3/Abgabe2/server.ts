import * as Http from "http";
import * as Url from "url";

export namespace P_3_2Server {
    console.log("Starting server"); // logs server start in console
    let port: number = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8080 (localhost:8080 for testing)
        port = 8080;

    let server: Http.Server = Http.createServer(); // creates server 
    server.addListener("request", handleRequest); // creates listener on server request/changes
    server.addListener("listening", handleListen); // creates listener for server listening
    server.listen(port); // creates listener on specific port

    function handleListen(): void {
        console.log("Listening"); // logs listening in console
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void { // checks for incoming request and server response
        console.log("I hear voices!"); // logs i hear voices
        console.log(_request.url); // returns url of the request to console
        _response.setHeader("content-type", "text/html; charset=utf-8"); // declares server response type to be in text/html
        _response.setHeader("Access-Control-Allow-Origin", "*"); // response access unrestricted

        if (_request.url) {
            let myURL: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let chosenPath: string = <string> myURL.pathname; // stores pathname in string
            // checks if /html or /json path was chosen
            if (chosenPath == "/html") { 
                for (let key in myURL.query) {
                    _response.write(key + ":" + myURL.query[key] + "<br/>"); // response from server
                }
            } else if (chosenPath == "/json") {
                let stringJSON: string = JSON.stringify(myURL.query); // obj to string
                console.log(stringJSON); // writes into server console
                _response.write(stringJSON); // response from server
            }
        }

        // _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }
}