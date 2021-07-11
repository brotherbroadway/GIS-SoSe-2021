namespace AbgabeEnd {

    window.addEventListener("load", loadFavRecipes);

    let _url: string;

    let currentUser: string = sessionStorage.getItem("ssnUser");
    let yourRecipesDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("yourRecipes");
    let navLog: HTMLAnchorElement = <HTMLAnchorElement> document.getElementById("logNav");

    navLogin();
    
    // shows log in/out button correctly
    function navLogin(): void {
        if (currentUser != null) {
            navLog.appendChild(document.createTextNode("Logout"));
            navLog.addEventListener("click", logUserOut);
        } else navLog.appendChild(document.createTextNode("Login"));
    }

    // logs user out
    function logUserOut(): void {
        sessionStorage.clear();
    }

    // server url
    function urlHere(): void {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }

    // loads your favorite recipes
    async function loadFavRecipes(): Promise <void> {
        urlHere();
        if (currentUser != null) {
            console.log("Loading my recipes...");
            _url += "/recipesAllFav?loggedUser=" + currentUser;
            let myFavResponse: Response = await fetch(_url);
            let myFavReply: string = await myFavResponse.text();
            if (myFavReply == "FavFail") { // appears when you have no favorites yet
                let errorYourRecipes: HTMLParagraphElement = document.createElement("p");
                errorYourRecipes.setAttribute("id", "errorMsg");
                errorYourRecipes.appendChild(document.createTextNode("You don't have any favorites yet!"));
                yourRecipesDiv.appendChild(errorYourRecipes);
            } else { // presents your favorites nicely
                let myFavUpdate: RecipeForm[] = JSON.parse(myFavReply);
                console.log(myFavUpdate);
                for (let i: number = 0; i < myFavUpdate.length; i++) {
                    let thatRecipe: HTMLDivElement = document.createElement("div");
                    thatRecipe.setAttribute("id", "fancyRecipe");
                    let thatFavDel: HTMLDivElement = document.createElement("div");
                    thatFavDel.setAttribute("id", "favDelDiv" + i);
                    yourRecipesDiv.appendChild(thatRecipe);
                    fancyShow(thatRecipe, myFavUpdate[i]);
                    thatRecipe.appendChild(thatFavDel);
                    showFavDel(thatFavDel, myFavUpdate[i]);
                }
    
                console.log("My recipes loaded!");
            }
        } else { // if user isn't logged in, warns them
            let errorYourRecipes: HTMLParagraphElement = document.createElement("p");
            errorYourRecipes.setAttribute("id", "errorMsg");
            errorYourRecipes.appendChild(document.createTextNode("You aren't logged in!"));
            yourRecipesDiv.appendChild(errorYourRecipes);
        }
    }

    // shows unfavorite button
    function showFavDel(_appendee: HTMLDivElement, _reply: RecipeForm): void {
        let favDelBttn: HTMLButtonElement = <HTMLButtonElement> document.createElement("button");
        favDelBttn.setAttribute("type", "button");
        favDelBttn.appendChild(document.createTextNode("Unfavorite"));
        _appendee.appendChild(favDelBttn);
        favDelBttn.dataset._id = _reply._id;
        favDelBttn.dataset.recipeName = _reply.recipeName;
        favDelBttn.addEventListener("click", clickFavDelBttn);
    }

    // click unfavorite button function
    async function clickFavDelBttn(_event: Event): Promise <void> {
        urlHere();

        let clickTarget: HTMLElement = <HTMLElement> _event.currentTarget;
        let recipeID: string = clickTarget.dataset._id;
        console.log(clickTarget.dataset._id);

        _url += "/recipeFavDel?_id=" + recipeID + "&crntUser=" + currentUser;
        console.log(_url);

        let delResponse: Response = await fetch(_url);
        let delReply: string = await delResponse.text();
        console.log(delReply);
        window.open("favRecipes.html", "_self");
    }

    // presents your favorited recipes nicely
    function fancyShow(_appendee: HTMLDivElement, _reply: RecipeForm): void {
        // create basic structure
        let fancyName: HTMLElement = <HTMLElement> document.createElement("h3");      
        let fancyAuthor: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyFullIngredients: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr1: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr2: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr3: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr4: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr5: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr6: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr7: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyIngr8: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
        let fancyNotes: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
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
}