"use strict";
var Abgabe3_1;
(function (Abgabe3_1) {
    async function sendData() {
        let dataForm = new FormData(document.forms[0]);
        console.log(": " + dataForm.get("name"));
        for (let entry of dataForm) {
            console.log(entry);
            console.log("name:" + entry[0]);
            console.log("value:" + entry[1]);
        }
        let query = new URLSearchParams(dataForm);
        let _url = "https://superomegaepicapp.herokuapp.com";
        _url = _url + "?" + query.toString();
        console.log(_url);
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.text();
        console.log(dataReply);
        let dataLog = document.getElementById("serverReply");
        dataLog.innerText = dataReply;
    }
    let buttonSend = document.getElementById("sendButton");
    buttonSend.addEventListener("click", sendData);
})(Abgabe3_1 || (Abgabe3_1 = {}));
//# sourceMappingURL=script.js.map