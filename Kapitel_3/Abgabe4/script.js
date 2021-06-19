"use strict";
var Abgabe3_4;
(function (Abgabe3_4) {
    // let sendToURL: string = "http://localhost:8100"; // private testing
    let sendToURL = "https://superomegaepicapp.herokuapp.com"; // public testing
    // these are for html output
    let dataLog = document.getElementById("serverReply");
    // html send function
    async function sendData(_url) {
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/send?" + query.toString(); // for /html + ? get request & to string
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.json();
        console.log(dataReply);
    }
    // json send function
    async function showData(_url) {
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/show?" + query.toString(); // for /json + ? get request & to string
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.json();
        let replyString = JSON.stringify(dataReply);
        dataLog.innerHTML = replyString; // appends reply to set div("serverReply")
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
    let buttonSend = document.getElementById("sendButton"); // send button defined
    let buttonShow = document.getElementById("showButton"); // show button defined
    buttonSend.addEventListener("click", sendBttn);
    buttonShow.addEventListener("click", showBttn);
})(Abgabe3_4 || (Abgabe3_4 = {}));
//# sourceMappingURL=script.js.map