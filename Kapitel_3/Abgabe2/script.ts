namespace Abgabe3_2 {

    // let sendToURL: string = "http://localhost:8080"; // private testing
    let sendToURL: string = "http://superomegaepicapp.herokuapp.com"; // public testing
    // these are for html output
    let dataLog: HTMLDivElement = <HTMLDivElement> document.getElementById("serverReply");

    // interface used for json
    interface DataJSON {
        username: string;
        password: string;
        mostepic: string;
        essay: string;
        checkbox: boolean;
    }

    // html send function
    async function sendHTMLData(_url: RequestInfo): Promise <void> {
        let dataForm: FormData = new FormData(document.forms[0]); // form data gets generated
        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        _url = _url + "/html?" + query.toString(); // for /html + ? get request & to string
        let dataResponse: Response = await fetch(_url);
        let dataReply: string = await dataResponse.text();
        dataLog.innerHTML = dataReply; // appends reply to set div("serverReply")
    }

    // json send function
    async function sendJSONData(_url: RequestInfo): Promise <void> {
        let dataForm: FormData = new FormData(document.forms[0]); // form data gets generated
        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        _url = _url + "/json?" + query.toString(); // for /json + ? get request & to string
        let dataResponse: Response = await fetch(_url);
        let objJSON: DataJSON = await dataResponse.json();
        console.log(objJSON); // writes json object in console
    }

    // html send
    function sendHTMLButton(_event: Event): void { // establishes communication with set website on click 
        sendHTMLData(sendToURL);
    }

    // json send
    function sendJSONButton(_event: Event): void { // establishes communication with set website on click
        sendJSONData(sendToURL);
    }

    // buttons initialized
    let buttonHTML: HTMLButtonElement = <HTMLButtonElement> document.getElementById("htmlButton"); // html button defined
    let buttonJSON: HTMLButtonElement = <HTMLButtonElement> document.getElementById("jsonButton"); // json button defined
    buttonHTML.addEventListener("click", sendHTMLButton);
    buttonJSON.addEventListener("click", sendJSONButton);
}