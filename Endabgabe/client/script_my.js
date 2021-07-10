"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbgabeEnd = void 0;
var AbgabeEnd;
(function (AbgabeEnd) {
    // let sendToURL: string = "http://localhost:8100"; // private testing 009
    window.addEventListener("load", loadMyRecipes);
    let _url;
    function urlHere() {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }
    async function loadMyRecipes() {
        urlHere();
        _url += "/recipesMy?";
        console.log(urlHere);
        let myResponse = await fetch(_url);
        let myReply = await myResponse.json();
        let loggedinUser = sessionStorage.getItem("ssnUser");
        console.log("Logged in user:" + loggedinUser);
        console.log(myReply);
    }
})(AbgabeEnd = exports.AbgabeEnd || (exports.AbgabeEnd = {}));
//# sourceMappingURL=script_my.js.map