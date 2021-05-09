"use strict";
var Abgabe2_3Aufgabe2;
(function (Abgabe2_3Aufgabe2) {
    // Variables
    let currentSelect = 1;
    let loaded = ["", "", ""];
    Abgabe2_3Aufgabe2.headSelect = [];
    Abgabe2_3Aufgabe2.bodySelect = [];
    Abgabe2_3Aufgabe2.legsSelect = [];
    Abgabe2_3Aufgabe2.choiceSelect = { head: undefined, body: undefined, legs: undefined };
    // Prev/Next Buttons Initialization
    let buttonNext = document.getElementById("bttnNext");
    let buttonPrev = document.getElementById("bttnPrev");
    buttonNext.addEventListener("click", nextSelect);
    buttonPrev.addEventListener("click", prevSelect);
    // Setting up loading images
    let loadedImages = [];
    window.addEventListener("load", loadedWindow);
    // Functions
    // Next Bodypart Selection
    function nextSelect() {
        let imageSpace = document.getElementById("dbdiv");
        switch (currentSelect) {
            case 1: // goes to body selection if current is head
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];
                Abgabe2_3Aufgabe2.midBody.forEach(images => {
                    let displayImg = document.createElement("img");
                    displayImg.src = images.link;
                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function () {
                        selectImage(displayImg, images);
                    });
                });
                currentSelect++;
                break;
            case 2: // goes to leg selection if current is body
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];
                Abgabe2_3Aufgabe2.botLegs.forEach(images => {
                    let displayImg = document.createElement("img");
                    displayImg.src = images.link;
                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function () {
                        selectImage(displayImg, images);
                    });
                });
                currentSelect++;
                break;
            default:
                console.log("End of line: Next."); // can't go past last selection
        }
    }
    // Previous Bodypart Selection
    function prevSelect() {
        let imageSpace = document.getElementById("dbdiv");
        switch (currentSelect) {
            case 2: // goes to head selection if current is body
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];
                Abgabe2_3Aufgabe2.topHead.forEach(images => {
                    let displayImg = document.createElement("img");
                    displayImg.src = images.link;
                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function () {
                        selectImage(displayImg, images);
                    });
                });
                currentSelect--;
                break;
            case 3: // goes to body selection if current is legs
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];
                Abgabe2_3Aufgabe2.midBody.forEach(images => {
                    let displayImg = document.createElement("img");
                    displayImg.src = images.link;
                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function () {
                        selectImage(displayImg, images);
                    });
                });
                currentSelect--;
                break;
            default:
                console.log("End of line: Prev."); // can't go past 1st selection
        }
    }
    // Loads initial images
    function loadedWindow() {
        let imageSpace = document.getElementById("dbdiv");
        Abgabe2_3Aufgabe2.topHead.forEach(images => {
            let displayImg = document.createElement("img");
            displayImg.src = images.link;
            loadedImages.push(displayImg);
            imageSpace.appendChild(displayImg);
            displayImg.addEventListener("click", function () {
                selectImage(displayImg, images);
            });
        });
    }
    // Gives out current selection to console
    function selectImage(displayImg, images) {
        if (images.type == 0) {
            Abgabe2_3Aufgabe2.choiceSelect.head = images;
            loaded[0] = images.link;
        }
        else if (images.type == 1) {
            Abgabe2_3Aufgabe2.choiceSelect.body = images;
            loaded[1] = images.link;
        }
        else if (images.type == 2) {
            Abgabe2_3Aufgabe2.choiceSelect.legs = images;
            loaded[2] = images.link;
        }
        displayImg.className += "chosen";
        loadedImages.forEach(part => {
            if (part != displayImg) {
                part.classList.remove("chosen");
            }
        });
        console.log(loaded);
    }
})(Abgabe2_3Aufgabe2 || (Abgabe2_3Aufgabe2 = {}));
//# sourceMappingURL=script.js.map