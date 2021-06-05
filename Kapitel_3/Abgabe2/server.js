"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
    console.log("Starting server"); // logs server start in console
    let port = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8080 (localhost:8080 for testing)
        port = 8080;
    let server = Http.createServer(); // creates server 
    server.addListener("request", handleRequest); // creates listener on server request/changes
    server.addListener("listening", handleListen); // creates listener for server listening
    server.listen(port); // creates listener on specific port
    function handleListen() {
        console.log("Listening"); // logs listening in console
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); // logs i hear voices
        console.log(_request.url); // returns url of the request to console
        _response.setHeader("content-type", "text/html; charset=utf-8"); // declares server response type to be in text/html
        _response.setHeader("Access-Control-Allow-Origin", "*"); // response access unrestricted
        if (_request.url) {
            let myURL = Url.parse(_request.url, true);
            let chosenPath = myURL.pathname; // stores pathname in string
            // checks if /html or /json path was chosen
            if (chosenPath == "/html") {
                for (let key in myURL.query) {
                    _response.write(key + ":" + myURL.query[key] + "<br/>"); // response from server
                }
            }
            else if (chosenPath == "/json") {
                let stringJSON = JSON.stringify(myURL.query); // obj to string
                console.log(stringJSON); // writes into server console
                _response.write(stringJSON); // response from server
            }
        }
        // _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//# sourceMappingURL=server.js.map