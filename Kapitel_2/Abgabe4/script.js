"use strict";
var Abgabe2_4;
(function (Abgabe2_4) {
    console.log("Background source: https://www.deviantart.com/tohad/art/Dragon-Ball-Kame-House-792024109");
    // Variables
    // let currentSelect: number = 1;
    let loaded = ["", "", ""];
    Abgabe2_4.choiceSelect = { head: undefined, body: undefined, legs: undefined };
    // For JSON conversion
    let mySelect = convertToObj();
    function convertToObj() {
        let mySelect = JSON.parse(Abgabe2_4.charJSON);
        return mySelect;
    }
    Abgabe2_4.topHead = mySelect.headTop;
    Abgabe2_4.midBody = mySelect.bodyMid;
    Abgabe2_4.botLegs = mySelect.legsBot;
    // Prev/Next Buttons Initialization
    let buttonNext = document.getElementById("bttnNext");
    let buttonPrev = document.getElementById("bttnPrev");
    //let buttonRestart: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bttnRestart");
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) != "result.html") { // gave typescript error without this if-clause
        buttonNext.addEventListener("click", nextSelect); // and didn't even show the result before ???
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) != "result.html" &&
        window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) != "head_select.html") { // apparently the entire site breaks
        buttonPrev.addEventListener("click", prevSelect); // if there isn't a button on a page 
    } // that has an event listener on it
    //buttonRestart.addEventListener("click", openHead);
    // Setting up loading images
    let loadedImages = [];
    window.addEventListener("load", loadedWindow);
    // Functions
    // Goes to next selection
    function nextSelect() {
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
    function prevSelect() {
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
    function loadedWindow() {
        //console.log(choiceSelect);
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "head_select.html") {
            let imageSpace = document.getElementById("dbdiv"); // Head Selection
            Abgabe2_4.topHead.forEach(images => {
                let displayImg = document.createElement("img");
                displayImg.src = images.link;
                loadedImages.push(displayImg);
                imageSpace.appendChild(displayImg);
                displayImg.addEventListener("click", function () {
                    selectImage(displayImg, images);
                });
            });
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "body_select.html") {
            let imageSpace = document.getElementById("dbdiv"); // Body Selection
            Abgabe2_4.midBody.forEach(images => {
                let displayImg = document.createElement("img");
                displayImg.src = images.link;
                loadedImages.push(displayImg);
                imageSpace.appendChild(displayImg);
                displayImg.addEventListener("click", function () {
                    selectImage(displayImg, images);
                });
            });
            let previewSpace = document.getElementById("dbPreview"); // Head Preview
            let image1 = document.createElement("img");
            image1.setAttribute("src", sessionStorage.getItem("image1"));
            previewSpace.appendChild(image1);
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "leg_select.html") {
            let imageSpace = document.getElementById("dbdiv"); // Leg Selection
            Abgabe2_4.botLegs.forEach(images => {
                let displayImg = document.createElement("img");
                displayImg.src = images.link;
                loadedImages.push(displayImg);
                imageSpace.appendChild(displayImg);
                displayImg.addEventListener("click", function () {
                    selectImage(displayImg, images);
                });
            });
            let previewSpace = document.getElementById("dbPreview"); // Head & Body Preview
            let image1 = document.createElement("img");
            let image2 = document.createElement("img");
            image1.setAttribute("src", sessionStorage.getItem("image1"));
            image2.setAttribute("src", sessionStorage.getItem("image2"));
            previewSpace.appendChild(image1);
            previewSpace.appendChild(image2);
        }
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "result.html") {
            let myResult = document.getElementById("dbResult"); // Result shown
            let image1 = document.createElement("img");
            let image2 = document.createElement("img");
            let image3 = document.createElement("img");
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
    function selectImage(displayImg, images) {
        if (images.type == 0) {
            Abgabe2_4.choiceSelect.head = images;
            loaded[0] = images.link;
            sessionStorage.setItem("image1", images.link);
        }
        else if (images.type == 1) {
            Abgabe2_4.choiceSelect.body = images;
            loaded[1] = images.link;
            sessionStorage.setItem("image2", images.link);
        }
        else if (images.type == 2) {
            Abgabe2_4.choiceSelect.legs = images;
            loaded[2] = images.link;
            sessionStorage.setItem("image3", images.link);
        }
        displayImg.className += "chosen";
        loadedImages.forEach(part => {
            if (part != displayImg) {
                part.classList.remove("chosen");
            }
        });
        console.log(sessionStorage);
    }
    /*function showResult(): void {
        let myResult: HTMLDivElement = <HTMLDivElement> document.getElementById("dbResult");
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

    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "result.html") {
        showResult();
    }*/
})(Abgabe2_4 || (Abgabe2_4 = {}));
//# sourceMappingURL=script.js.map