"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server"); // logs server start in console
    let port = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8100
        port = 8100;
    let server = Http.createServer(); // creates server 
    server.addListener("request", handleRequest); // creates listener on server request/changes
    server.addListener("listening", handleListen); // creates listener for server listening
    server.listen(port); // creates listener on specific port
    function handleListen() {
        console.log("Listening"); // logs listening in console
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); // logs i hear voices
        _response.setHeader("content-type", "text/html; charset=utf-8"); // declares server response type to be in text/html
        _response.setHeader("Access-Control-Allow-Origin", "*"); // response can be shared publicly
        _response.write(_request.url); // writes the response in the url
        _response.end(); // ends the response
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map