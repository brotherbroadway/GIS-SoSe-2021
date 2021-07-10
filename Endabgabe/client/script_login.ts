namespace AbgabeEnd {

    /*interface UserRegForm { // Form entry as interface
        username: string;
        password: string;
    }*/

    // let sendToURL: string = "http://localhost:8100"; // private testing 003
    let sendToURL: string = "https://superomegaepicapp.herokuapp.com"; // public testing
    // these are for error msg output
    // let dataLog: HTMLDivElement = <HTMLDivElement> document.getElementById("serverReply");

    // register function
    async function userRegData(_url: RequestInfo): Promise <void> {
        console.log("Testing user register");
        let dataForm: FormData = new FormData(document.forms[0]); // form data gets generated
        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        _url = _url + "/userRegister?" + query.toString(); // for /html + ? get request & to string
        let dataResponse: Response = await fetch(_url);
        let dataReply: string = await dataResponse.text();
        console.log("User's register data:");
        console.log(dataReply);
        sessionStorage.clear();
        if (dataReply != "UserFail") {
            sessionStorage.setItem("ssnUser", JSON.stringify(dataReply)); // ssn = session
            window.open("allRecipes.html", "_self");
            //window.location.href = "allRecipes.html";
        } else {
            window.alert("User already exists!");
        }

        // do something here, open recipes n shit
    }

    // login function
    async function userLoginData(_url: RequestInfo): Promise <void> {
        console.log("Testing user login");
        let dataForm: FormData = new FormData(document.forms[0]); // form data gets generated
        let query: URLSearchParams = new URLSearchParams(<any>dataForm);
        _url = _url + "/userLogin?" + query.toString(); // for /json + ? get request & to string
        let dataResponse: Response = await fetch(_url);
        let dataReply: string = await dataResponse.text();
        // let replyString: string = JSON.stringify(dataReply);
        // dataLog.innerHTML = replyString; // appends reply to set div("serverReply")
        console.log("User's login data:");
        console.log(dataReply);
        sessionStorage.clear();
        if (dataReply != "UserFail") {
            sessionStorage.setItem("ssnUser", JSON.stringify(dataReply)); // ssn = session
            window.open("allRecipes.html", "_self");
        } else {
            window.alert("Username/password doesn't exist!");
        }
    }

    // login button send
    function userRegBttn(_event: Event): void { // establishes communication with set website on click 
        userRegData(sendToURL);
    }

    // register button send
    function userLoginBttn(_event: Event): void { // establishes communication with set website on click
        userLoginData(sendToURL);
    }

    // buttons initialized
    let buttonUserReg: HTMLButtonElement = <HTMLButtonElement> document.getElementById("userRegisterButton"); // send button defined
    let buttonUserLogin: HTMLButtonElement = <HTMLButtonElement> document.getElementById("userLoginButton"); // show button defined
    buttonUserReg.addEventListener("click", userRegBttn);
    buttonUserLogin.addEventListener("click", userLoginBttn);
}