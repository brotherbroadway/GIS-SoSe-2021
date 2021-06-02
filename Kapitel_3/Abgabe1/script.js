"use strict";
var Abgabe3_1;
(function (Abgabe3_1) {
    async function sendData(_url) {
        let dataForm = new FormData(document.forms[0]); // defines form
        let query = new URLSearchParams(dataForm);
        _url = _url + "?" + query.toString();
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.text();
        let dataLog = document.getElementById("serverReply");
        let dataArea = document.createElement("textarea");
        let stringOutput = "";
        console.log(": " + dataForm.get("name"));
        for (let entry of dataForm) { // for each form entry, logs form in string & console
            stringOutput += "Name: " + entry[0] + "\nValue: " + entry[1] + "\n\n";
            console.log(entry);
            console.log("name:" + entry[0]);
            console.log("value:" + entry[1]);
        }
        console.log(_url);
        console.log(dataReply);
        dataArea.appendChild(document.createTextNode(stringOutput)); // adds form string to textarea element
        dataArea.appendChild(document.createTextNode("URL: " + dataReply));
        if (dataLog.hasChildNodes() == false) { // checks if there's already a textarea, but also has to refresh for another entry
            dataLog.appendChild(dataArea); // adds textarea element to div
            dataArea.setAttribute("rows", "20");
            dataArea.setAttribute("cols", "35");
        }
    }
    function sendButton(_event) {
        sendData("https://superomegaepicapp.herokuapp.com");
    }
    let buttonSend = document.getElementById("sendButton"); // button defined
    buttonSend.addEventListener("click", sendButton);
})(Abgabe3_1 || (Abgabe3_1 = {}));
//# sourceMappingURL=script.js.map