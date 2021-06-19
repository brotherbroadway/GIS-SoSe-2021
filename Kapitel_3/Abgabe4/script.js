"use strict";
var Abgabe3_4;
(function (Abgabe3_4) {
    // let sendToURL: string = "http://localhost:8080"; // private testing
    let sendToURL = "https://superomegaepicapp.herokuapp.com"; // public testing
    // these are for html output
    let dataLog = document.getElementById("serverReply");
    // html send function
    async function sendData(_url) {
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/send?" + query.toString(); // for /html + ? get request & to string
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.text();
        console.log(dataReply);
    }
    // json send function
    async function showData(_url) {
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/show?" + query.toString(); // for /json + ? get request & to string
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.text();
        dataLog.innerHTML = dataReply; // appends reply to set div("serverReply")
    }
    // html send
    function sendBttn(_event) {
        sendData(sendToURL);
    }
    // json send
    function showBttn(_event) {
        showData(sendToURL);
    }
    // buttons initialized
    let buttonHTML = document.getElementById("htmlButton"); // html button defined
    let buttonJSON = document.getElementById("jsonButton"); // json button defined
    buttonHTML.addEventListener("click", sendBttn);
    buttonJSON.addEventListener("click", showBttn);
})(Abgabe3_4 || (Abgabe3_4 = {}));
//# sourceMappingURL=script.js.map