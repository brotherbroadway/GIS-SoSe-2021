namespace Abgabe2_3Aufgabe2 {

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

    // Variables
    let currentSelect: number = 1;
    let loaded: string[] = ["", "", ""];

    export let headSelect: DBType[] = [];
    export let bodySelect: DBType[] = [];
    export let legsSelect: DBType[] = [];
    export let choiceSelect: DBChar = {head: undefined, body: undefined, legs: undefined};

    // Prev/Next Buttons Initialization
    let buttonNext: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bttnNext");
    let buttonPrev: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bttnPrev");

    buttonNext.addEventListener("click", nextSelect);
    buttonPrev.addEventListener("click", prevSelect);

    // Setting up loading images
    let loadedImages: HTMLImageElement[] = [];
    window.addEventListener("load", loadedWindow);

    // Functions

    // Next Bodypart Selection
    function nextSelect(): void {
        let imageSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbdiv");
        switch (currentSelect) {
            case 1: // goes to body selection if current is head
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];

                midBody.forEach (images => { // "images" might cause problems
                    let displayImg: HTMLImageElement = document.createElement("img");
                    displayImg.src = images.link;

                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function(): void {
                        selectImage(displayImg, images);
                    });
                });
                currentSelect++;
                break;
            case 2: // goes to leg selection if current is body
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];

                botLegs.forEach (images => { // "images" might cause problems
                    let displayImg: HTMLImageElement = document.createElement("img");
                    displayImg.src = images.link;

                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function(): void {
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
    function prevSelect(): void {
        let imageSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbdiv");
        switch (currentSelect) {
            case 2: // goes to head selection if current is body
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];

                topHead.forEach (images => { // "images" might cause problems
                    let displayImg: HTMLImageElement = document.createElement("img");
                    displayImg.src = images.link;

                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function(): void {
                        selectImage(displayImg, images);
                    });
                });
                currentSelect--;
                break;
            case 3: // goes to body selection if current is legs
                document.getElementById("dbdiv").innerHTML = "";
                loadedImages = [];

                midBody.forEach (images => { // "images" might cause problems
                    let displayImg: HTMLImageElement = document.createElement("img");
                    displayImg.src = images.link;

                    loadedImages.push(displayImg);
                    imageSpace.appendChild(displayImg);
                    displayImg.addEventListener("click", function(): void {
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
    function loadedWindow(): void {
        let imageSpace: HTMLDivElement = <HTMLDivElement> document.getElementById("dbdiv");
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

    // Gives out current selection to console
    function selectImage(displayImg: HTMLImageElement, images: DBType): void {
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
    }
}