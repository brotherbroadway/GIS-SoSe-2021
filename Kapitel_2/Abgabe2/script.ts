namespace Abgabe2_2Aufgabe1 {
    // - Aufgabe 1a -
    console.log("--- Aufgabe 1a ---");
    function min(..._manyNum: number[]): number {
        let minResult: number;
        minResult = Math.min(..._manyNum);
        return minResult;
    }
    console.log(min(16, 234, 82, -42, 50));

    // - Aufgabe 1b -
    console.log("--- Aufgabe 1b ---");
    function isEven(_insertedNumb: number): boolean {
        let evenOddResult: boolean;
        let theNum: number = _insertedNumb;
        while (theNum > 1) { // number - 2 as long as it's > 1
            theNum -= 2;     // stops, when it's reached 0 / 1
        }
        switch (theNum) {
            case 0:         // 0 is even
                evenOddResult = true;
                break;
            case 1:         // 1 is odd
                evenOddResult = false;
                break;
            default:        // catches exception (-1)
                evenOddResult = false;
        }
        return evenOddResult;
    }
    console.log(isEven(50));
    // Ich hatte keine Probleme bei 50 & 75.
    // -1 konnte ich lösen, indem ich den return-Value zu false defaultet habe.

    // - Aufgabe 1c -
    // -- c1 & c5 --
    console.log("--- Aufgabe 1c ---");
    
    class Student {
        lastName: string;
        firstName: string;
        semester: number;
        matrikelnummer: number;

        constructor(_lastName: string, _firstName: string, _semester: number, _matrikelnummer: number) { // :void = Error:
            this.lastName = _lastName;                                                                   // Type annotation cannot appear
            this.firstName = _firstName;                                                                 // on a constructor declaration.
            this.semester = _semester;
            this.matrikelnummer = _matrikelnummer;
        }

        showInfo(): void {
            console.log("Name: " +  this.firstName + " " + this.lastName + "\nStudiensemester: " + // prints full name, semester and enrolment number
            this.semester + "\nMatrikelnummer: " + this.matrikelnummer);
        }
    }

    // -- c2 --
    let s1: Student = new Student("Ruder", "Jona", 2, 265274); // declaring new students
    let s2: Student = new Student("Mustermann", "Max", 1, 123456);
    let s3: Student = new Student("Tubby", "Tele", 5, 987654);
    // -- c3 --
    let uniStudents: Student[] = [s1, s2, s3]; // student array
    uniStudents.push(new Student("Nukem", "Duke", 9, 420360)); // adding new student
    console.log("The last student's name is " + uniStudents[3].firstName + " " + uniStudents[3].lastName + "."); // testing student info
    console.log("There are " + uniStudents.length + " students enrolled currently.");
    console.log("The 3rd student is in their " + uniStudents[2].semester + "th Semester.");
    console.log("The first student's enrolment number is " + uniStudents[0].matrikelnummer + ".");
    // -- c4 --
    for (let i: number = 0; i < uniStudents.length; i++) {
        uniStudents[i].showInfo(); // showing full info for all students in array
    }
}

namespace Abgabe2_2Aufgabe2 {
    // Aufgabe 2a
    console.log("--- Aufgabe 2a ---");

    function backwards(_givenArr: number[]): number[] {
        let backwArr: number[] = new Array;
        for (let i: number = _givenArr.length - 1; i >= 0; i--) { // starts from last array entry
            backwArr.push(_givenArr[i]); // pushes last entry as its first, and so on
        }
        return backwArr;
    }
    
    let arr: number[] = [5, 42, 17, 2018, -10, 60, -10010];
    let arrBack: number[] = backwards(arr);
    console.log(arr);
    console.log(arrBack);

    // Aufgabe 2b
    console.log("--- Aufgabe 2b ---");
    
    function join(_firstArr: number[], _manyMoreArr: number[]): number[] {
        _firstArr.push(..._manyMoreArr); // adds 2nd arr to the end of the first
        return _firstArr;
    }

    console.log(join(arr, [15, 9001, -440]));
    // console.log(join([123, 666, -911], arr, [15, 9001, -440, 1024]));

    // Aufgabe 2c
    console.log("--- Aufgabe 2c ---");

    function split(_arrToSplit: number[], _index1: number, _index2: number): number[] {
        let splitArr: number[] = new Array;
        if (_index1 > _index2) { // if first index > 2nd index, pushes in reverse order
            for (let i: number = _index1; i >= _index2; i--) {
                splitArr.push(_arrToSplit[i]);
            }
        }

        if (_index1 < 0) { // if first index < 0, sets first index to 0
            _index1 = 0;
            for (let i: number = _index1; i <= _index2; i++) {
                splitArr.push(_arrToSplit[i]);
            }
        }

        if (_index2 > _arrToSplit.length - 1) { // if 2nd index > last index, set 2nd index to last index
            _index2 = _arrToSplit.length - 1;
            for (let i: number = _index1; i <= _index2; i++) {
                splitArr.push(_arrToSplit[i]);
            }
        }

        for (let i: number = _index1; i <= _index2; i++) { // if everything is in order, pushes from index1 to index2
            splitArr.push(_arrToSplit[i]);
        }

        return splitArr;
    }

    console.log(arr);
    console.log(split(arr, 1, 2));
    console.log(split(arr, 2, 0));     // Bonus c)
    console.log(split(arr, -1, 2));    // Bonus c)
    console.log(split(arr, 0, 7));     // Bonus c)
}

namespace Abgabe2_2Aufgabe3 {
    // Aufgabe 3a
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("myFirstCanvas");

    let context: CanvasRenderingContext2D = canvas.getContext("2d");

    context.fillStyle = "blue"; // sky
    context.fillRect(0, 0, 500, 400);

    context.fillStyle = "green"; // ground
    context.fillRect(0, 380, 500, 20);

    context.fillStyle = "red"; // base house
    context.fillRect(75, 280, 150, 110);

    context.fillStyle = "black"; // door
    context.fillRect(130, 330, 40, 60);

    context.beginPath(); // roof
    context.moveTo(50, 280);
    context.lineTo(150, 200);
    context.lineTo(250, 280);
    context.closePath();
    context.fillStyle = "orange";
    context.fill();

    let sunPath: Path2D = new Path2D(); // sun
    sunPath.arc(60, 70, 40, 0, 2 * Math.PI);
    context.fillStyle = "yellow";
    context.fill(sunPath);

    context.fillStyle = "brown"; // base tree
    context.fillRect(350, 190, 60, 200);

    context.fillStyle = "darkgreen"; // tree leaves
    let leaves1Path: Path2D = new Path2D();
    leaves1Path.arc(320, 200, 65, 0, 2 * Math.PI);
    context.fill(leaves1Path);
    let leaves2Path: Path2D = new Path2D();
    leaves2Path.arc(375, 130, 70, 0, 2 * Math.PI);
    context.fill(leaves2Path);
    let leaves3Path: Path2D = new Path2D();
    leaves3Path.arc(420, 190, 70, 0, 2 * Math.PI);
    context.fill(leaves3Path);

    context.fillStyle = "white"; // clouds
    let clouds1Path: Path2D = new Path2D();
    clouds1Path.arc(260, 130, 40, 1 * Math.PI, 0);
    context.fill(clouds1Path);
    let clouds2Path: Path2D = new Path2D();
    clouds2Path.arc(350, 130, 70, 1 * Math.PI, 0);
    context.fill(clouds2Path);
    let clouds3Path: Path2D = new Path2D();
    clouds3Path.arc(100, 140, 50, 1 * Math.PI, 0);
    context.fill(clouds3Path);
    let clouds4Path: Path2D = new Path2D();
    clouds4Path.arc(0, 140, 80, 1 * Math.PI, 0);
    context.fill(clouds4Path);

    context.lineWidth = 5; // border
    context.strokeStyle = "black";
    context.strokeRect(2.5, 2.5, 495, 395);

    // - Aufgabe 3b -
    let cnvs: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("my2ndCanvas");

    let cntxt: CanvasRenderingContext2D = cnvs.getContext("2d");

    function getRandomColor(): string { // I wanted to randomize the color as well ^^
        let letters: string = "0123456789ABCDEF";
        let color: string = "#";
        for (let i: number = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      

    class Rectangular {
        xPos: number;
        yPos: number;
        width: number;
        height: number;

        // - Aufgabe 3c -
        constructor() { // random rectangle (maximum dimensions 200, 200)
            this.xPos = Math.floor(Math.random() * 490);
            this.yPos = Math.floor(Math.random() * 390);
            this.width = Math.floor(Math.random() * 200) + 1;
            this.height = Math.floor(Math.random() * 200) + 1;
            // i wanted to put random color in here,
            // but it makes all of the rectangles
            // in the array the same color then...
        }

        // - Aufgabe 3d -
        drawRect(): void {
            cntxt.fillStyle = getRandomColor(); // random color :)
            cntxt.fillRect(this.xPos, this.yPos, this.width, this.height);
        }
    }

    let rect1: Rectangular = new Rectangular();
    rect1.drawRect();

    // - Aufgabe 3e -
    let rect2: Rectangular = new Rectangular();
    let rect3: Rectangular = new Rectangular();
    let rect4: Rectangular = new Rectangular();
    let rectArr: Rectangular[] = [rect2, rect3, rect4]; // rectangle array
    for (let i: number = 0; i < rectArr.length; i++) {
        rectArr[i].drawRect(); // fills 3 random rectangles
    }
}