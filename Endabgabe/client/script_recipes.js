"use strict";
// interfaces taken from interface.d.ts
var AbgabeEnd;
(function (AbgabeEnd) {
    // let sendToURL: string = "http://localhost:8100"; // private testing 009
    window.addEventListener("load", loadAllRecipes);
    let _url;
    let currentUser = sessionStorage.getItem("ssnUser");
    let navLog = document.getElementById("logNav");
    let allRecipesDiv = document.getElementById("DisplayAllHere");
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
    // server url
    function urlHere() {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }
    // loads all recipes in database
    async function loadAllRecipes() {
        urlHere();
        _url += "/recipesAll?";
        console.log(_url);
        let loggedinUser = sessionStorage.getItem("ssnUser");
        console.log(sessionStorage.getItem("ssnUser"));
        if (sessionStorage.getItem("ssnUser") == null) {
            sessionStorage.clear();
        }
        let allResponse = await fetch(_url);
        let allReply = await allResponse.json();
        console.log("Logged in user: " + loggedinUser);
        console.log(allReply);
        for (let i = 0; i < allReply.length; i++) {
            let thatRecipe = document.createElement("div");
            thatRecipe.setAttribute("id", "fancyRecipe");
            allRecipesDiv.appendChild(thatRecipe);
            // presents them nicely
            fancyShow(thatRecipe, allReply[i]);
            if (currentUser != undefined) {
                if (currentUser != allReply[i].recipeAuthor) {
                    // if user is logged in & not the author of that recipe, they can favorite it
                    showFav(thatRecipe, allReply[i]);
                }
            }
        }
    }
    // show favorite button function
    function showFav(_appendee, _reply) {
        let buttonShowDiv = document.createElement("div");
        let buttonFavRecipe = document.createElement("button");
        buttonFavRecipe.setAttribute("type", "button");
        buttonFavRecipe.setAttribute("id", "favButton");
        buttonFavRecipe.appendChild(document.createTextNode("Favorite"));
        buttonShowDiv.appendChild(buttonFavRecipe);
        _appendee.appendChild(buttonShowDiv);
        buttonFavRecipe.dataset._id = _reply._id;
        buttonFavRecipe.addEventListener("click", clickFavBttn);
    }
    // click favorite button function
    async function clickFavBttn(_event) {
        urlHere();
        console.log(_url);
        let clickTarget = _event.currentTarget;
        let recipeID = clickTarget.dataset._id;
        console.log(recipeID);
        _url += "/recipeFav?_id=" + recipeID + "&crntUser=" + currentUser;
        console.log(_url);
        let favResponse = await fetch(_url);
        let favReply = await favResponse.text();
        console.log(favReply);
        if (favReply == "FailFav") {
            window.alert("You've already favorited this recipe!");
        }
        else
            window.open("allRecipes.html", "_self");
    }
    // presents recipes nicely
    function fancyShow(_appendee, _reply) {
        // create basic structure
        let fancyName = document.createElement("h3");
        let fancyAuthor = document.createElement("p");
        let fancyFullIngredients = document.createElement("p");
        let fancyIngr1 = document.createElement("p");
        let fancyIngr2 = document.createElement("p");
        let fancyIngr3 = document.createElement("p");
        let fancyIngr4 = document.createElement("p");
        let fancyIngr5 = document.createElement("p");
        let fancyIngr6 = document.createElement("p");
        let fancyIngr7 = document.createElement("p");
        let fancyIngr8 = document.createElement("p");
        let fancyNotes = document.createElement("p");
        // append recipe name
        fancyName.appendChild(document.createTextNode(_reply.recipeName));
        fancyAuthor.appendChild(document.createTextNode("Author: " + _reply.recipeAuthor));
        // append ingredients
        fancyIngr1.appendChild(document.createTextNode(_reply.ingredient1));
        fancyIngr2.appendChild(document.createTextNode(_reply.ingredient2));
        fancyIngr3.appendChild(document.createTextNode(_reply.ingredient3));
        fancyIngr4.appendChild(document.createTextNode(_reply.ingredient4));
        fancyIngr5.appendChild(document.createTextNode(_reply.ingredient5));
        fancyIngr6.appendChild(document.createTextNode(_reply.ingredient6));
        fancyIngr7.appendChild(document.createTextNode(_reply.ingredient7));
        fancyIngr8.appendChild(document.createTextNode(_reply.ingredient8));
        fancyFullIngredients.appendChild(document.createTextNode("Ingredients:"));
        fancyFullIngredients.appendChild(fancyIngr1);
        fancyFullIngredients.appendChild(fancyIngr2);
        fancyFullIngredients.appendChild(fancyIngr3);
        fancyFullIngredients.appendChild(fancyIngr4);
        fancyFullIngredients.appendChild(fancyIngr5);
        fancyFullIngredients.appendChild(fancyIngr6);
        fancyFullIngredients.appendChild(fancyIngr7);
        fancyFullIngredients.appendChild(fancyIngr8);
        // append notes
        fancyNotes.appendChild(document.createTextNode("Author's notes: " + _reply.recipeNotes));
        // append to show on site
        _appendee.appendChild(fancyName);
        _appendee.appendChild(fancyAuthor);
        _appendee.appendChild(fancyFullIngredients);
        _appendee.appendChild(fancyNotes);
    }
})(AbgabeEnd || (AbgabeEnd = {}));
//# sourceMappingURL=script_recipes.js.map