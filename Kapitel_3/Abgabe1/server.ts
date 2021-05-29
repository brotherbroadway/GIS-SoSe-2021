import * as Http from "http";

export namespace P_3_1Server {
    console.log("Starting server"); // logs server start in console
    let port: number = Number(process.env.PORT); // creates port variable and configures environment port variable
    if (!port) // if there's no port, set the port to 8100
        port = 8100;

    let server: Http.Server = Http.createServer(); // creates server 
    server.addListener("request", handleRequest); // creates listener on server request/changes
    server.addListener("listening", handleListen); // creates listener for server listening
    server.listen(port); // creates listener on specific port

    function handleListen(): void {
        console.log("Listening"); // logs listening in console
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void { // checks for incoming request and server response
        console.log("I hear voices!"); // logs i hear voices
        _response.setHeader("content-type", "text/html; charset=utf-8"); // declares server response type to be in text/html
        _response.setHeader("Access-Control-Allow-Origin", "*"); // response access unrestricted
        _response.write(_request.url); // what gets returned for the response to the request
        _response.end(); // ends the response and sends it
    }
}