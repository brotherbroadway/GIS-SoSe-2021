namespace Abgabe2_3Aufgabe1 {
    // let head: HTMLHeadElement = document.head;
    let body: HTMLElement = document.body;

    let divCreate: HTMLDivElement = document.createElement("div");
    divCreate.setAttribute("id", "rectDiv");

    let divStorage: HTMLDivElement[] = [];

    function getRandomColor(): string { // random color for rectangles
        let letters: string = "0123456789ABCDEF";
        let color: string = "#";
        for (let i: number = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    for (let i: number = 0; i < 4; i++) { // initial 4 rectangles created
        console.log("Initial rectangle #" + (i + 1) + " created.");
        let initRect: HTMLDivElement = document.createElement("div");
        initRect.style.position = "absolute";
        initRect.style.backgroundColor = getRandomColor();
        initRect.style.width = Math.floor(Math.random() * 300) + "px";
        initRect.style.height = Math.floor(Math.random() * 300) + "px";
        initRect.style.left = Math.floor(Math.random() * 1150) + 50 + "px";
        initRect.style.top = Math.floor(Math.random() * 550) + 50 + "px";
        body.appendChild(initRect);
        divStorage.push(initRect);
    }

    function createRect(): void { // new rectangles on click function
        console.log("New rectangle created!");
        let rectCreated: HTMLDivElement = document.createElement("div");
        rectCreated.style.position = "absolute";
        rectCreated.style.backgroundColor = getRandomColor();
        rectCreated.style.width = Math.floor(Math.random() * 300) + "px";
        rectCreated.style.height = Math.floor(Math.random() * 300) + "px";
        rectCreated.style.left = Math.floor(Math.random() * 1150) + 50 + "px";
        rectCreated.style.top = Math.floor(Math.random() * 550) + 50 + "px";
        body.appendChild(rectCreated);
        divStorage.push(rectCreated);
    }

    function destroyRect(): void { // destroy rectangles on click function
        divStorage.forEach(element => {
            body.removeChild(element);
        });
        divStorage = [];
    }

    let createBttn: HTMLInputElement = <HTMLInputElement> document.getElementById("createButton"); // create rectangle button
    createBttn.addEventListener("click", createRect);

    let destroyBttn: HTMLInputElement = <HTMLInputElement> document.getElementById("destroyButton"); // destroy rectangle button
    destroyBttn.addEventListener("click", destroyRect);
}