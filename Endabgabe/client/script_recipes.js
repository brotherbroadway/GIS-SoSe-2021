"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbgabeEnd = void 0;
var AbgabeEnd;
(function (AbgabeEnd) {
    // let sendToURL: string = "http://localhost:8100"; // private testing 009
    window.addEventListener("load", loadAllRecipes);
    let _url;
    function urlHere() {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }
    async function loadAllRecipes() {
        urlHere();
        _url += "/recipesAll?";
        console.log(urlHere);
        let allResponse = await fetch(_url);
        let allReply = await allResponse.json();
        let loggedinUser = sessionStorage.getItem("ssnUser");
        console.log("Logged in user:" + loggedinUser);
        console.log(allReply);
    }
})(AbgabeEnd = exports.AbgabeEnd || (exports.AbgabeEnd = {}));
//# sourceMappingURL=script_recipes.js.map