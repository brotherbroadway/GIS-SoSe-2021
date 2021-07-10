"use strict";
var AbgabeEnd;
(function (AbgabeEnd) {
    /*interface UserRegForm { // Form entry as interface
        username: string;
        password: string;
    }*/
    // let sendToURL: string = "http://localhost:8100"; // private testing 005
    let sendToURL = "https://superomegaepicapp.herokuapp.com"; // public testing
    // these are for error msg output
    // let dataLog: HTMLDivElement = <HTMLDivElement> document.getElementById("serverReply");
    // register function
    async function userRegData(_url) {
        console.log("Testing user register");
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/userRegister?" + query.toString(); // for /html + ? get request & to string
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.text();
        console.log("User's register data:");
        console.log(dataReply);
        sessionStorage.clear();
        if (dataReply != "UserFail") {
            sessionStorage.setItem("ssnUser", JSON.stringify(dataReply)); // ssn = session
            window.open("allRecipes.html", "_self");
            //window.location.href = "allRecipes.html";
        }
        else {
            window.alert("User already exists!");
        }
        // do something here, open recipes n shit
    }
    // login function
    async function userLoginData(_url) {
        console.log("Testing user login");
        let dataForm = new FormData(document.forms[0]); // form data gets generated
        let query = new URLSearchParams(dataForm);
        _url = _url + "/userLogin?" + query.toString(); // for /json + ? get request & to string
        let dataResponse = await fetch(_url);
        let dataReply = await dataResponse.text();
        // let replyString: string = JSON.stringify(dataReply);
        // dataLog.innerHTML = replyString; // appends reply to set div("serverReply")
        console.log("User's login data:");
        console.log(dataReply);
        sessionStorage.clear();
        if (dataReply != "UserFail") {
            sessionStorage.setItem("ssnUser", JSON.stringify(dataReply)); // ssn = session
            window.open("allRecipes.html", "_self");
        }
        else {
            window.alert("Username/password doesn't exist!");
        }
    }
    // login button send
    function userRegBttn(_event) {
        userRegData(sendToURL);
    }
    // register button send
    function userLoginBttn(_event) {
        userLoginData(sendToURL);
    }
    // buttons initialized
    let buttonUserReg = document.getElementById("userRegisterButton"); // send button defined
    let buttonUserLogin = document.getElementById("userLoginButton"); // show button defined
    buttonUserReg.addEventListener("click", userRegBttn);
    buttonUserLogin.addEventListener("click", userLoginBttn);
})(AbgabeEnd || (AbgabeEnd = {}));
//# sourceMappingURL=script_login.js.map