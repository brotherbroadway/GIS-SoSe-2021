namespace Abgabe3_1 {

    async function sendData(_url: RequestInfo): Promise <void> {
        let dataForm: FormData = new FormData(document.forms[0]); // defines form
        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        _url = _url + "?" + query.toString();
        let dataResponse: Response = await fetch(_url);
        let dataReply: string = await dataResponse.text();
        let dataLog: HTMLDivElement = <HTMLDivElement> document.getElementById("serverReply");
        let dataArea: HTMLTextAreaElement = document.createElement("textarea");
        let stringOutput: string = "";
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

    function sendButton(_event: Event): void { // establishes communication with set website on click
        sendData("https://superomegaepicapp.herokuapp.com");
    }

    let buttonSend: HTMLButtonElement = <HTMLButtonElement> document.getElementById("sendButton"); // button defined
    buttonSend.addEventListener("click", sendButton);
}