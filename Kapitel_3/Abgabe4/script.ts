namespace Abgabe3_4 {

    // let sendToURL: string = "http://localhost:8080"; // private testing
    let sendToURL: string = "https://superomegaepicapp.herokuapp.com"; // public testing
    // these are for html output
    let dataLog: HTMLDivElement = <HTMLDivElement> document.getElementById("serverReply");

    // html send function
    async function sendData(_url: RequestInfo): Promise <void> {
        let dataForm: FormData = new FormData(document.forms[0]); // form data gets generated
        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        _url = _url + "/send?" + query.toString(); // for /html + ? get request & to string
        let dataResponse: Response = await fetch(_url);
        let dataReply: string = await dataResponse.text();
        console.log(dataReply);
    }

    // json send function
    async function showData(_url: RequestInfo): Promise <void> {
        let dataForm: FormData = new FormData(document.forms[0]); // form data gets generated
        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        _url = _url + "/show?" + query.toString(); // for /json + ? get request & to string
        let dataResponse: Response = await fetch(_url);
        let dataReply: string = await dataResponse.text();
        dataLog.innerHTML = dataReply; // appends reply to set div("serverReply")
    }

    // html send
    function sendBttn(_event: Event): void { // establishes communication with set website on click 
        sendData(sendToURL);
    }

    // json send
    function showBttn(_event: Event): void { // establishes communication with set website on click
        showData(sendToURL);
    }

    // buttons initialized
    let buttonSend: HTMLButtonElement = <HTMLButtonElement> document.getElementById("sendButton"); // send button defined
    let buttonShow: HTMLButtonElement = <HTMLButtonElement> document.getElementById("showButton"); // show button defined
    buttonSend.addEventListener("click", sendBttn);
    buttonShow.addEventListener("click", showBttn);
}