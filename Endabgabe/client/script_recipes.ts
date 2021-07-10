import * as Interface from "../server/interface";

export namespace AbgabeEnd {
    // let sendToURL: string = "http://localhost:8100"; // private testing 009

    window.addEventListener("load", loadAllRecipes);

    let _url: string;

    function urlHere(): void {
        _url = "https://superomegaepicapp.herokuapp.com"; // public testing
        // _url = "http://localhost:8100"; // private testing
    }

    async function loadAllRecipes(): Promise <void> {
        urlHere();
        _url += "/recipesAll?";
        console.log(urlHere);

        let allResponse: Response = await fetch(_url);
        let allReply: Interface.RecipeForm[] = await allResponse.json();
        let loggedinUser: string = sessionStorage.getItem("ssnUser");
        console.log("Logged in user:" + loggedinUser);
        console.log(allReply);
    }
}