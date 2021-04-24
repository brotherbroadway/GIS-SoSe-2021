"use strict";
// --- Aufgabe 1 ---
    /*
function a1(): void {
    let x: string = "Alles";
    console.log(x);
    func0();
    console.log(x);
    func1();
    console.log(x);
    console.log("Logo!");
}

a1();

function func1(): void {
    console.log("klar?");
}

function func0(): void { // zu 1c
    console.log("Gute?");
}
    */
/*
- 1a -
 Die Funktionsnamen können nicht mit einer Zahl oder einem Sonderzeichen anfangen.

 - 1b -
Die Konsole gibt den Inhalt von x, also "Alles" aus,
dann wird func1 ausgeführt, das die Konsole "Klar?" printen lässt.
Danach wird der Rest der a1 Funktion gelesen, was jetzt nur noch ein Konsolenprint "Logo!" ist.
 */

//  --- Aufgabe 2 ---
/* function a2(): void {
    let i: number = 9;

    do {
        console.log(i);
        i = i - 1;
    } while( i > 0);
}

a2();
*/
/*
- 2 -
i = 9 am Anfang.
Die do-while-Schleife wird immer mindestens einmal ausgeführt.
Also gibt sie zuerst 9 aus und dann zieht 1 ab.
Das geht weiter, bis i nicht mehr größer als 0 ist.
Die Konsolenausgabe wird deshalb 9, 8, 7, 6, 5, 4, 3, 2, 1 sein.
*/

// --- Aufgabe 4 ---
/*
let x: string = "Hallo";
console.log(x);
func1(x);
console.log(x);
func2();
func3();
console.log(x);

function func1(y: string): void{
    y = "Bla";
    console.log(y);
}

function func2(): void{
    let x: string = "Blubb";
    console.log(x);
}

function func3(): void{
    x = "Test";
}
/*
- 4a -
Annahme von der Ausgebung: Hallo, Bla, Hallo, Blubb, Test.
Korrekt!
Bei func1 wird zuerst x als Übergabeparameter angegeben, was heißt, dass x = y lokal ist,
welches dann aber gleich danach zu "Bla" geändert und dann geprintet wird.
Bei func2 hat der lokale String x Vorrang über den globalen, also wird "Blubb" zurückgegeben.
In func3 wird x = "Test" gesetzt, und global ausgeführt, was den String dann auch global ändert.

- 4b -
Globale Variablen können überall im Code verwendet werden.
Lokale Variablen können nur in einer Funktion benutzt werden und werden außerhalb nicht verstanden.
Übergabeparameter werden verwendet, um Information in und aus einer Funktion zu übermitteln.
"Normale" Variablen können nur kleine Informationsstücke in sich behalten,
während Funktionen diese Informationen dann komplex in sich bearbeiten können.
*/

console.log("-- Aufgaben 1-4 sind auskommentiert --");

// --- Aufgabe 5 ---

// - 5a -
function multiply(_x: number, _y: number): number {
    let result: number;
    result = _x * _y;
    return result;
}
console.log("-- Aufgabe 5a -- \nDas Ergebnis ist " + multiply(8, 6) + "!" );

// - 5b -
function max(_num1: number, _num2: number): number {
    let maxResult: number;
    maxResult = Math.max(_num1, _num2);
    return maxResult;
}
console.log("-- Aufgabe 5b -- \nDas Ergebnis ist " + max(22, 64) + "!");

// - 5c -
let initNumber: number = 1;
let finalNumber: number = 0;
while (initNumber <= 100) {
    finalNumber = finalNumber + initNumber;
    initNumber++;
}
console.log("-- Aufgabe 5c -- \nDas Ergebnis ist " + finalNumber + "!");

// - 5d -
console.log("-- Aufgabe 5d --")
for (let i: number = 0; i < 10; i++) {
    let randomNumber: number = Math.floor(Math.random() * 100); // used Math.floor() so it doesn't spit out a super long number
    console.log((i + 1) + "te Zahl ist " + randomNumber + "!");
}

// - 5e -
function factorial(_myNumber: number): number {
    let facNumber: number = 1;
    let givenNumber: number = _myNumber;
    if (_myNumber < 1) {
        return 1;
    } else {
        for (let i: number = 1; i <= _myNumber; i++) {
            facNumber = facNumber * givenNumber;
            givenNumber--; // starts using highest given number first and goes down to 1
        }
        return facNumber;
    }
}
console.log("-- Aufgabe 5e -- \nDas Ergebnis ist " + factorial(4) + "!");

// - 5f -
console.log("-- Aufgabe 5f --");

function leapyears(): void {
    let currentYear: number = 1900;
    for (let i: number = 0; currentYear + i <= 2021; i++) {
        let itLeaps: number = currentYear + i;
        if (itLeaps % 4 == 0 && itLeaps % 100 != 0) { // divided by 4, but not by 100 is a leapyear
            console.log(itLeaps + " ist ein Schaltjahr.");
        }
        if (itLeaps % 400 == 0) { // divided by 400 is also a leapyear though
            console.log(itLeaps + " ist ein Schaltjahr.");
        }
    }
}
leapyears();

// --- Aufgabe 6 ---

// - 6a -
console.log("-- Aufgabe 6a --");

let hashtag: string = "";

do {
    hashtag = hashtag + "#";
    console.log(hashtag);
} while (hashtag.length < 7); // gives out hashtag consolelogs until it reaches length of 7

// - 6b -
console.log("-- Aufgabe 6b --");

for (let i: number = 1; i <= 100; i++) {
    if (i % 3 == 0) { // divided by 3 is Fizz
        console.log("Fizz");
    } else if (i % 5 == 0 && i % 3 != 0) { // divided by 5, but not 3 is Buzz
        console.log("Buzz");
    } else console.log(i); // else gives out number
}

// - 6c -
console.log("-- Aufgabe 6c --");

for (let i: number = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) { // inserted FizzBuzz at the top
        console.log("FizzBuzz");    // because it would not read otherwise
    } else if (i % 3 == 0) {        // cuz it would've been overridden by just Fizz
        console.log("Fizz");
    } else if (i % 5 == 0 && i % 3 != 0) {
        console.log("Buzz");
    } else console.log(i);
}

// - 6d -
console.log("-- Aufgabe 6d --");

function hashtaggery(): void {
    let fullLine: string = "";
    let spaceChar: string = " ";
    let hashChar: string = "#";
    for (let p: number = 0; p <= 7; p++) {
        if (p % 2 == 0) {                                            // even lines start with space
            fullLine = fullLine + spaceChar;
        } else fullLine = fullLine + hashChar;                       // uneven ones with a hashtag
        for (let i: number = 0; i <= 6; i++) {
            if (fullLine.endsWith(" ") || fullLine.endsWith("\n")) { // also works with just endsWith(" "),
                fullLine = fullLine + hashChar;                      // but added endsWith("\n")
            } else fullLine = fullLine + spaceChar;                  // to make sure my intention was clear
        }
        fullLine = fullLine + "\n";
    }
    console.log(fullLine);
}
hashtaggery();

// - 6e -
console.log("-- Aufgabe 6e --");

function hashtaggening(_boardSize: number): void {
    let fullLine: string = "";
    let spaceChar: string = " ";
    let hashChar: string = "#";
    for (let p: number = 0; p <= _boardSize - 1; p++) { // replaced fixed boardSize with variable one
        if (p % 2 == 0) {
            fullLine = fullLine + spaceChar;
        } else fullLine = fullLine + hashChar;
        for (let i: number = 0; i <= _boardSize - 2; i++) { // also here
            if (fullLine.endsWith(" ") || fullLine.endsWith("\n")) {
                fullLine = fullLine + hashChar;
            } else fullLine = fullLine + spaceChar;
        }
        fullLine = fullLine + "\n";
    }
    console.log(fullLine);
}
hashtaggening(10);