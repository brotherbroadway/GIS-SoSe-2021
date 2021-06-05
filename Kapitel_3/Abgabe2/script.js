"use strict";
var Abgabe3_2;
(function (Abgabe3_2) {
    // let sendToURL: string = "http://localhost:8080"; // private testing
    let sendToURL = "https://superomegaepicapp.herokuapp.com"; // public testing
    // these are for html output
    let dataLog = document.getElementById("serverReply");
    // html send function
    async function sendHTMLData(_url) {
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/html?" + query.toString(); // for /html + ? get request & to string
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.text();
        dataLog.innerHTML = dataReply; // appends reply to set div("serverReply")
    }
    // json send function
    async function sendJSONData(_url) {
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/json?" + query.toString(); // for /json + ? get request & to string
        let dataResponse = await fetch(_url);
        let objJSON = await dataResponse.json();
        console.log(objJSON); // writes json object in console
    }
    // html send
    function sendHTMLButton(_event) {
        sendHTMLData(sendToURL);
    }
    // json send
    function sendJSONButton(_event) {
        sendJSONData(sendToURL);
    }
    // buttons initialized
    let buttonHTML = document.getElementById("htmlButton"); // html button defined
    let buttonJSON = document.getElementById("jsonButton"); // json button defined
    buttonHTML.addEventListener("click", sendHTMLButton);
    buttonJSON.addEventListener("click", sendJSONButton);
})(Abgabe3_2 || (Abgabe3_2 = {}));
//# sourceMappingURL=script.js.map