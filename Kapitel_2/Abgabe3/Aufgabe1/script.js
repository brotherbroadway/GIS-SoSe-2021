"use strict";
var Abgabe2_3Aufgabe1;
(function (Abgabe2_3Aufgabe1) {
    // let head: HTMLHeadElement = document.head;
    let body = document.body;
    let divCreate = document.createElement("div");
    divCreate.setAttribute("id", "rectDiv");
    let divStorage = [];
    function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    for (let i = 0; i < 4; i++) { // initial 4 rectangles created
        console.log("Initial rectangle #" + (i + 1) + " created.");
        let initRect = document.createElement("div");
        initRect.style.position = "absolute";
        initRect.style.backgroundColor = getRandomColor();
        initRect.style.width = Math.floor(Math.random() * 300) + "px";
        initRect.style.height = Math.floor(Math.random() * 300) + "px";
        initRect.style.left = Math.floor(Math.random() * 1150) + 50 + "px";
        initRect.style.top = Math.floor(Math.random() * 550) + 50 + "px";
        body.appendChild(initRect);
        divStorage.push(initRect);
    }
    function createRect() {
        console.log("New rectangle created!");
        let rectCreated = document.createElement("div");
        rectCreated.style.position = "absolute";
        rectCreated.style.backgroundColor = getRandomColor();
        rectCreated.style.width = Math.floor(Math.random() * 300) + "px";
        rectCreated.style.height = Math.floor(Math.random() * 300) + "px";
        rectCreated.style.left = Math.floor(Math.random() * 1150) + 50 + "px";
        rectCreated.style.top = Math.floor(Math.random() * 550) + 50 + "px";
        body.appendChild(rectCreated);
        divStorage.push(rectCreated);
    }
    function destroyRect() {
        divStorage.forEach(element => {
            body.removeChild(element);
        });
        divStorage = [];
    }
    let createBttn = document.getElementById("createButton"); // create rectangle button
    createBttn.addEventListener("click", createRect);
    let destroyBttn = document.getElementById("destroyButton"); // destroy rectangle button
    destroyBttn.addEventListener("click", destroyRect);
})(Abgabe2_3Aufgabe1 || (Abgabe2_3Aufgabe1 = {}));
//# sourceMappingURL=script.js.map