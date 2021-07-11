"use strict";
var AbgabeEnd;
(function (AbgabeEnd) {
    /*interface UserRegForm { // User form entry as interface
        username: string;
        password: string;
        favRecipes: RecipeForm[];
    }*/
    // let sendToURL: string = "http://localhost:8100"; // private testing 009
    let sendToURL = "https://superomegaepicapp.herokuapp.com"; // public testing
    // let dataLog: HTMLDivElement = <HTMLDivElement> document.getElementById("serverReply");
    let currentUser = sessionStorage.getItem("ssnUser");
    let navLog = document.getElementById("logNav");
    navLogin();
    // shows log in/out button correctly
    function navLogin() {
        if (currentUser != null) {
            navLog.appendChild(document.createTextNode("Logout"));
            navLog.addEventListener("click", logUserOut);
        }
        else
            navLog.appendChild(document.createTextNode("Login"));
    }
    // logs user out
    function logUserOut() {
        sessionStorage.clear();
    }
    // register function
    async function userRegData(_url) {
        if (sessionStorage.getItem("ssnUser") != undefined) {
            console.log("User already logged in.");
            window.alert("You are already logged in!");
        }
        else {
            console.log("User registration in progress...");
            let dataForm = new FormData(document.forms[0]); // form data gets generated
            let query = new URLSearchParams(dataForm);
            _url = _url + "/userRegister?" + query.toString(); // for /html + ? get request & to string
            let dataResponse = await fetch(_url);
            let dataReply = await dataResponse.text();
            sessionStorage.clear();
            if (dataReply != "UserFail") { // if reply went through correclty, adds user to sessionStorage
                sessionStorage.setItem("ssnUser", dataForm.get("username").toString()); // ssn = session
                window.open("allRecipes.html", "_self");
            }
            else { // else warns them
                window.alert("User already exists!");
            }
        }
    }
    // login function
    async function userLoginData(_url) {
        if (sessionStorage.getItem("ssnUser") != undefined) { // if you're already logged in, prevents you from doing it again
            console.log("User already logged in.");
            window.alert("You are already logged in!");
        }
        else {
            console.log("User login in progress...");
            let dataForm = new FormData(document.forms[0]); // form data gets generated
            let query = new URLSearchParams(dataForm);
            _url = _url + "/userLogin?" + query.toString(); // for /json + ? get request & to string
            let dataResponse = await fetch(_url);
            let dataReply = await dataResponse.text();
            sessionStorage.clear();
            if (dataReply != "UserFail") { // if user exists in database, adds user to sessionStorage
                sessionStorage.setItem("ssnUser", dataForm.get("username").toString()); // ssn = session
                window.open("allRecipes.html", "_self");
            }
            else { // else wanrs them
                window.alert("Username/password doesn't exist!");
            }
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