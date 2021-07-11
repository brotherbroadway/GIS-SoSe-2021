"use strict";
// interfaces taken from interface.d.ts
var AbgabeEnd;
(function (AbgabeEnd) {
    window.addEventListener("load", loadMyRecipes);
    let _url;
    let currentUser = sessionStorage.getItem("ssnUser");
    let yourRecipesDiv = document.getElementById("yourRecipes");
    let myHeaderDiv = document.getElementById("recipeHeader");
    let navLog = document.getElementById("logNav");
    let formRecipeName = document.getElementById("recipeName");
    let formIngr1 = document.getElementById("ingredient1");
    let formIngr2 = document.getElementById("ingredient2");
    let formIngr3 = document.getElementById("ingredient3");
    let formIngr4 = document.getElementById("ingredient4");
    let formIngr5 = document.getElementById("ingredient5");
    let formIngr6 = document.getElementById("ingredient6");
    let formIngr7 = document.getElementById("ingredient7");
    let formIngr8 = document.getElementById("ingredient8");
    let formRecipeNotes = document.getElementById("recipeNotes");
    console.log("Current user is '" + currentUser + "'.");
    // server url
    function urlHere() {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }
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
    // create a recipe here
    async function createRecipe() {
        if (currentUser != null) {
            console.log("Recipe creation in progress...");
            urlHere();
            let userEditData = currentUser;
            let saveRecipeForm = new FormData(document.forms[0]); // form data gets generated
            let query = new URLSearchParams(saveRecipeForm);
            _url += "/recipeSave?" + query.toString();
            if (sessionStorage.getItem("originName") != undefined) {
                // For submitting edited recipes
                let origName = sessionStorage.getItem("originName");
                userEditData += "&originName=" + origName;
            }
            // submitting or resubmitting recipes
            let saveResponse = await fetch(_url + "&recipeAuthor=" + userEditData);
            let saveReply = await saveResponse.text();
            console.log(saveReply);
            sessionStorage.removeItem("originName");
            window.open("myRecipes.html", "_self");
        }
        else
            window.alert("You have to log in to use this feature!");
    }
    // loads previously submitted recipes from user
    async function loadMyRecipes() {
        if (currentUser != null) {
            console.log("Loading my recipes...");
            urlHere();
            _url += "/recipesMy?loggedUser=" + currentUser;
            let myResponse = await fetch(_url);
            let myReply = await myResponse.json();
            myHeaderDiv.appendChild(document.createTextNode(currentUser + "'s Recipes"));
            // for usage in editing recipes
            formRecipeName.value = sessionStorage.getItem("recipeName");
            formIngr1.value = sessionStorage.getItem("ingr1");
            formIngr2.value = sessionStorage.getItem("ingr2");
            formIngr3.value = sessionStorage.getItem("ingr3");
            formIngr4.value = sessionStorage.getItem("ingr4");
            formIngr5.value = sessionStorage.getItem("ingr5");
            formIngr6.value = sessionStorage.getItem("ingr6");
            formIngr7.value = sessionStorage.getItem("ingr7");
            formIngr8.value = sessionStorage.getItem("ingr8");
            formRecipeNotes.value = sessionStorage.getItem("recipeNotes");
            if (sessionStorage.getItem("recipeName") != undefined) {
                sessionStorage.setItem("originName", sessionStorage.getItem("recipeName"));
            }
            console.log(myReply);
            // adds your recipes as many as you have (.length)
            for (let i = 0; i < myReply.length; i++) {
                let thatRecipe = document.createElement("div");
                thatRecipe.setAttribute("id", "fancyRecipe");
                yourRecipesDiv.appendChild(thatRecipe);
                fancyShow(thatRecipe, myReply[i]);
                showEditDelete(thatRecipe, myReply[i]);
            }
            console.log("My recipes loaded!");
            sessionStorage.removeItem("recipeName");
            sessionStorage.removeItem("ingr1");
            sessionStorage.removeItem("ingr2");
            sessionStorage.removeItem("ingr3");
            sessionStorage.removeItem("ingr4");
            sessionStorage.removeItem("ingr5");
            sessionStorage.removeItem("ingr6");
            sessionStorage.removeItem("ingr7");
            sessionStorage.removeItem("ingr8");
            sessionStorage.removeItem("recipeNotes");
        }
        else {
            // if user isn't logged in, shows them error msg
            let errorYourRecipes = document.createElement("p");
            errorYourRecipes.appendChild(document.createTextNode("You aren't logged in!"));
            errorYourRecipes.setAttribute("id", "errorMsg");
            myHeaderDiv.appendChild(document.createTextNode("Your Recipes"));
            yourRecipesDiv.appendChild(errorYourRecipes);
        }
    }
    // show edit & delete buttons for your recipes
    function showEditDelete(_appendee, _reply) {
        let buttonShowDiv = document.createElement("div");
        let buttonEditRecipe = document.createElement("button");
        let buttonDelRecipe = document.createElement("button");
        buttonEditRecipe.setAttribute("type", "button");
        buttonDelRecipe.setAttribute("type", "button");
        buttonEditRecipe.appendChild(document.createTextNode("Edit"));
        buttonDelRecipe.appendChild(document.createTextNode("Delete"));
        buttonShowDiv.appendChild(buttonEditRecipe);
        buttonShowDiv.appendChild(buttonDelRecipe);
        _appendee.appendChild(buttonShowDiv);
        buttonEditRecipe.addEventListener("click", clickEditBttn);
        buttonDelRecipe.addEventListener("click", clickDelBttn);
        // for sessionStorage usage
        buttonEditRecipe.dataset.recipeName = _reply.recipeName;
        buttonEditRecipe.dataset.ingredient1 = _reply.ingredient1;
        buttonEditRecipe.dataset.ingredient2 = _reply.ingredient2;
        buttonEditRecipe.dataset.ingredient3 = _reply.ingredient3;
        buttonEditRecipe.dataset.ingredient4 = _reply.ingredient4;
        buttonEditRecipe.dataset.ingredient5 = _reply.ingredient5;
        buttonEditRecipe.dataset.ingredient6 = _reply.ingredient6;
        buttonEditRecipe.dataset.ingredient7 = _reply.ingredient7;
        buttonEditRecipe.dataset.ingredient8 = _reply.ingredient8;
        buttonEditRecipe.dataset.recipeNotes = _reply.recipeNotes;
        buttonDelRecipe.dataset.recipeName = _reply.recipeName;
        // console.log(buttonEditRecipe.dataset.recipeName);
    }
    // click edit button function
    async function clickEditBttn(_event) {
        urlHere();
        // adds clicked button to submit form, to resubmit
        // can also change title :O
        let clickTarget = _event.currentTarget;
        sessionStorage.setItem("recipeName", clickTarget.dataset.recipeName);
        sessionStorage.setItem("ingr1", clickTarget.dataset.ingredient1);
        sessionStorage.setItem("ingr2", clickTarget.dataset.ingredient2);
        sessionStorage.setItem("ingr3", clickTarget.dataset.ingredient3);
        sessionStorage.setItem("ingr4", clickTarget.dataset.ingredient4);
        sessionStorage.setItem("ingr5", clickTarget.dataset.ingredient5);
        sessionStorage.setItem("ingr6", clickTarget.dataset.ingredient6);
        sessionStorage.setItem("ingr7", clickTarget.dataset.ingredient7);
        sessionStorage.setItem("ingr8", clickTarget.dataset.ingredient8);
        sessionStorage.setItem("recipeNotes", clickTarget.dataset.recipeNotes);
        window.open("myRecipes.html", "_self");
    }
    // click delete button function
    async function clickDelBttn(_event) {
        urlHere();
        let clickTarget = _event.currentTarget;
        let nameRecipe = clickTarget.dataset.recipeName;
        console.log(clickTarget.dataset.recipeName);
        // console.log(nameRecipe);
        _url += "/recipeDel?recipeName=" + nameRecipe;
        console.log(_url);
        let delResponse = await fetch(_url);
        let delReply = await delResponse.text();
        console.log(delReply);
        window.open("myRecipes.html", "_self");
    }
    // presents your recipes nicely
    function fancyShow(_appendee, _reply) {
        // create basic structure
        let fancyName = document.createElement("h3");
        //let fancyAuthor: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
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
        //fancyAuthor.appendChild(document.createTextNode("Author: " + _reply.recipeAuthor));
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
        fancyNotes.appendChild(document.createTextNode("Your notes: " + _reply.recipeNotes));
        // append to show on site
        _appendee.appendChild(fancyName);
        //_appendee.appendChild(fancyAuthor);
        _appendee.appendChild(fancyFullIngredients);
        _appendee.appendChild(fancyNotes);
    }
    let buttonSaveRecipe = document.getElementById("saveRecipe"); // save button defined
    buttonSaveRecipe.addEventListener("click", createRecipe);
})(AbgabeEnd || (AbgabeEnd = {}));
//# sourceMappingURL=script_my.js.map