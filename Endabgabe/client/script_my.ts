import * as Interface from "../server/interface";

export namespace AbgabeEnd {
    // let sendToURL: string = "http://localhost:8100"; // private testing 009

    window.addEventListener("load", loadMyRecipes);

    let _url: string;

    function urlHere(): void {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }

    async function loadMyRecipes(): Promise <void> {
        urlHere();
        _url += "/recipesMy?";
        console.log(urlHere);

        let myResponse: Response = await fetch(_url);
        let myReply: Interface.RecipeForm[] = await myResponse.json();
        let loggedinUser: string = sessionStorage.getItem("ssnUser");
        console.log("Logged in user:" + loggedinUser);
        console.log(myReply);
    }
}