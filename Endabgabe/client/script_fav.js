"use strict";
var AbgabeEnd;
(function (AbgabeEnd) {
    window.addEventListener("load", loadFavRecipes);
    let _url;
    let currentUser = sessionStorage.getItem("ssnUser");
    let yourRecipesDiv = document.getElementById("yourRecipes");
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
    // server url
    function urlHere() {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }
    // loads your favorite recipes
    async function loadFavRecipes() {
        urlHere();
        if (currentUser != null) {
            console.log("Loading my recipes...");
            _url += "/recipesAllFav?loggedUser=" + currentUser;
            let myFavResponse = await fetch(_url);
            let myFavReply = await myFavResponse.text();
            if (myFavReply == "FavFail") { // appears when you have no favorites yet
                let errorYourRecipes = document.createElement("p");
                errorYourRecipes.setAttribute("id", "errorMsg");
                errorYourRecipes.appendChild(document.createTextNode("You don't have any favorites yet!"));
                yourRecipesDiv.appendChild(errorYourRecipes);
            }
            else { // presents your favorites nicely
                let myFavUpdate = JSON.parse(myFavReply);
                console.log(myFavUpdate);
                for (let i = 0; i < myFavUpdate.length; i++) {
                    let thatRecipe = document.createElement("div");
                    thatRecipe.setAttribute("id", "fancyRecipe");
                    let thatFavDel = document.createElement("div");
                    thatFavDel.setAttribute("id", "favDelDiv" + i);
                    yourRecipesDiv.appendChild(thatRecipe);
                    fancyShow(thatRecipe, myFavUpdate[i]);
                    thatRecipe.appendChild(thatFavDel);
                    showFavDel(thatFavDel, myFavUpdate[i]);
                }
                console.log("My recipes loaded!");
            }
        }
        else { // if user isn't logged in, warns them
            let errorYourRecipes = document.createElement("p");
            errorYourRecipes.setAttribute("id", "errorMsg");
            errorYourRecipes.appendChild(document.createTextNode("You aren't logged in!"));
            yourRecipesDiv.appendChild(errorYourRecipes);
        }
    }
    // shows unfavorite button
    function showFavDel(_appendee, _reply) {
        let favDelBttn = document.createElement("button");
        favDelBttn.setAttribute("type", "button");
        favDelBttn.appendChild(document.createTextNode("Unfavorite"));
        _appendee.appendChild(favDelBttn);
        favDelBttn.dataset._id = _reply._id;
        favDelBttn.dataset.recipeName = _reply.recipeName;
        favDelBttn.addEventListener("click", clickFavDelBttn);
    }
    // click unfavorite button function
    async function clickFavDelBttn(_event) {
        urlHere();
        let clickTarget = _event.currentTarget;
        let recipeID = clickTarget.dataset._id;
        console.log(clickTarget.dataset._id);
        _url += "/recipeFavDel?_id=" + recipeID + "&crntUser=" + currentUser;
        console.log(_url);
        let delResponse = await fetch(_url);
        let delReply = await delResponse.text();
        console.log(delReply);
        window.open("favRecipes.html", "_self");
    }
    // presents your favorited recipes nicely
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
        fancyName.appendChild(document.createTextNode("Recipe: " + _reply.recipeName));
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
//# sourceMappingURL=script_fav.js.map