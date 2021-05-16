namespace Abgabe2_4 {

    console.log("Background source: https://www.deviantart.com/tohad/art/Dragon-Ball-Kame-House-792024109");

    // Interfaces
    export interface DBChar {
        head: DBType;
        body: DBType;
        legs: DBType;
    }

    export interface DBType {
        link: string;
        type: number;
    }

    export interface DBSelection { // To manage JSON
        headTop: DBType[];
        bodyMid: DBType[];
        legsBot: DBType[];
    }

    // Variables
    // let currentSelect: number = 1;
    let loaded: string[] = ["", "", ""];

    export let choiceSelect: DBChar = {head: undefined, body: undefined, legs: undefined};

    // For JSON conversion
    let mySelect: DBSelection = convertToObj();

    function convertToObj(): DBSelection {
        let mySelect: DBSelection = JSON.parse(charJSON);
        return mySelect;
    }

    export let topHead: DBType[] = mySelect.headTop;
    export let midBody: DBType[] = mySelect.bodyMid;
    export let botLegs: DBType[] = mySelect.legsBot;

    // Prev/Next Buttons Initialization
    let buttonNext: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bttnNext");
    let buttonPrev: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bttnPrev");
    //let buttonRestart: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bttnRestart");

    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) != "result.html") { // gave typescript error without this if-clause
        buttonNext.addEventListener("click", nextSelect);                                                     // and didn't even show the result before ???
    }

    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) != "result.html" && 
    window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) != "head_select.html" ) { // apparently the entire site breaks
        buttonPrev.addEventListener("click", prevSelect);                                                       // if there isn't a button on a page 
    }                                                                                                           // that has an event listener on it
    
    //buttonRestart.addEventListener("click", openHead);

    // Setting up loading images
    let loadedImages: HTMLImageElement[] = [];
    window.addEventListener("load", loadedWindow);

    // Functions

    // Goes to next selection
    function nextSelect(): void {
        switch (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)) {
            case " ":
                window.open("head_select.html", "_self");
                break;
            case "head_select.html":
                window.open("body_select.html", "_self");
                break;
            case "body_select.html":
                window.open("leg_select.html", "_self");
                break;
            case "leg_select.html":
                window.open("result.html", "_self");
                break;
            default:
                console.log("End of line: Next.");
        }
    }

    // Goes to previous selection
    function prevSelect(): void {
        switch (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)) {
            case " ":
                window.open("head_select.html", "_self");
                break;
            case "head_select.html":
                window.open("head_select.html", "_self");
                break;
            case "body_select.html":
                window.open("head_select.html", "_self");
                break;
            case "leg_select.html":
                window.open("body_select.html", "_self");
                break;
            default:
                console.log("End of line: Prev.");
        }
    }

    // Loads images
    function loadedWindow(): void {
        //console.log(choiceSelect);
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "head_select.html") {
            let imageSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbdiv"); // Head Selection
            topHead.forEach (images => {
                let displayImg: HTMLImageElement = document.createElement("img");
                displayImg.src = images.link;
                loadedImages.push(displayImg);
                imageSpace.appendChild(displayImg);
                displayImg.addEventListener("click", function(): void {
                    selectImage(displayImg, images);
                });
            });
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "body_select.html") {
            let imageSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbdiv"); // Body Selection
            midBody.forEach (images => {
                let displayImg: HTMLImageElement = document.createElement("img");
                displayImg.src = images.link;
                loadedImages.push(displayImg);
                imageSpace.appendChild(displayImg);
                displayImg.addEventListener("click", function(): void {
                    selectImage(displayImg, images);
                });
            });
            let previewSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbPreview"); // Head Preview
            let image1: HTMLImageElement = document.createElement("img");
            image1.setAttribute("src", sessionStorage.getItem("image1"));
            previewSpace.appendChild(image1);
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "leg_select.html") {
            let imageSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbdiv"); // Leg Selection
            botLegs.forEach (images => {
                let displayImg: HTMLImageElement = document.createElement("img");
                displayImg.src = images.link;
                loadedImages.push(displayImg);
                imageSpace.appendChild(displayImg);
                displayImg.addEventListener("click", function(): void {
                    selectImage(displayImg, images);
                });
            });
            let previewSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbPreview"); // Head & Body Preview
            let image1: HTMLImageElement = document.createElement("img");
            let image2: HTMLImageElement = document.createElement("img");
            image1.setAttribute("src", sessionStorage.getItem("image1"));
            image2.setAttribute("src", sessionStorage.getItem("image2"));
            previewSpace.appendChild(image1);
            previewSpace.appendChild(image2);
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "result.html") {
            let myResult: HTMLDivElement = <HTMLDivElement> document.getElementById("dbResult"); // Result shown
            let image1: HTMLImageElement = document.createElement("img");
            let image2: HTMLImageElement = document.createElement("img");
            let image3: HTMLImageElement = document.createElement("img");
    
            image1.setAttribute("src", sessionStorage.getItem("image1"));
            image2.setAttribute("src", sessionStorage.getItem("image2"));
            image3.setAttribute("src", sessionStorage.getItem("image3"));
    
            myResult.appendChild(image1);
            myResult.appendChild(image2);
            myResult.appendChild(image3);
        }
    }

    // Previous function that gave out selection in console
    /*function selectImage(displayImg: HTMLImageElement, images: DBType): void {
        if (images.type == 0) {
            choiceSelect.head = images;
            loaded[0] = images.link;
        } else if (images.type == 1) {
            choiceSelect.body = images;
            loaded[1] = images.link;
        } else if (images.type == 2) {
            choiceSelect.legs = images;
            loaded[2] = images.link;
        }
        displayImg.className += "chosen";
        loadedImages.forEach (part => {
            if (part != displayImg) {
                part.classList.remove("chosen");
            }
        });
        console.log(loaded);
    }*/

    // Select image to log in storage
    function selectImage(displayImg: HTMLImageElement, images: DBType): void {
        if (images.type == 0) {
            choiceSelect.head = images;
            loaded[0] = images.link;
            sessionStorage.setItem("image1", images.link);
        } else if (images.type == 1) {
            choiceSelect.body = images;
            loaded[1] = images.link;
            sessionStorage.setItem("image2", images.link);
        } else if (images.type == 2) {
            choiceSelect.legs = images;
            loaded[2] = images.link;
            sessionStorage.setItem("image3", images.link);
        }
        displayImg.className += "chosen";
        loadedImages.forEach (part => {
            if (part != displayImg) {
                part.classList.remove("chosen");
            }
        });
        console.log(sessionStorage);
    }
}