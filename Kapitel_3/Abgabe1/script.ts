namespace Abgabe3_1 {

    async function sendData(): Promise <void> {
        let dataForm: FormData = new FormData(document.forms[0]);
        console.log(": " + dataForm.get("name"));

        for (let entry of dataForm) {
            console.log(entry);
            console.log("name:" + entry[0]);
            console.log("value:" + entry[1]);
        }

        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        let _url: RequestInfo = "https://superomegaepicapp.herokuapp.com";
        _url = _url + "?" + query.toString();
        console.log(_url);
        let dataResponse: Response = await fetch(_url);
        let dataReply: string = await dataResponse.text();
        console.log(dataReply);
        let dataLog: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("serverReply");
        dataLog.innerText = dataReply;
    }

    let buttonSend: HTMLButtonElement = <HTMLButtonElement> document.getElementById("sendButton");
    buttonSend.addEventListener("click", sendData);
}