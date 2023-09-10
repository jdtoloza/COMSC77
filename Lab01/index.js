// ================================
//     Header
// ================================

/*
Name : Joshua Toloza
Date: 09/10/23
Assignment: Lab 01
Language: Html, Javascript
Description: 

This program will convert a binary or decimal number to 3 other types of numbers. The result will show an octal, decimal, binary, and hexadecimal number in the index.html file. 

*/


// ================================
//     Variables
// ================================
let result;
let userInput;
let typeOfNumber;
let decimal = 10;
let binary = 2;
let octal = 8;
let hex = 16;
let arr = new Array();
let arr2 = new Array();
// ================================
//     Main 
// ================================

promptUser();
console.log(userInput);
console.log(typeOfNumber);
if(typeOfNumber == "decimal") {
    decimalInputConversion(userInput);
} else {
    binaryInputConversion(userInput);
}

// ================================
//     Functions
// ================================


// conver user decimal input to octal, hexadecimal, and binary 
function decimalInputConversion(input) {
    input = Number(input);
    console.log(input)
    let octalResult = convertByDivision(8, input);
    console.log(octalResult);
    let binaryResult = convertByDivision(2, input);
    let hexResult = binaryToHex(binaryResult);
    
    document.querySelector('.answer').innerHTML = `
        <table>
        <tr>
        <th>Type</th>
        <th>Number</th>
        <tr>
        <td>User Input (Decimal)</td>
        <td>${input}</td>
        </tr>
        <tr>
        <tr>
        <td>Octal</td>
        <td>${octalResult}</td>
        </tr>
        <tr>
        <td>Binary</td>
        <td>${binaryResult}</td>
        </tr>
        <tr>
        <td>Hex</td>
        <td>${hexResult}</td>
        </tr>
        `;
}

// convert user binary input to decimal, hexadeximal, and octal
function binaryInputConversion(input) {
    
    let decimalResult = binaryToDecimal(input)
    let hexResult = binaryToHex(input);
    let octalResult = convertByDivision(8, decimalResult);
    console.log(decimalResult);
    console.log(hexResult);
    console.log(octalResult);

    document.querySelector('.answer').innerHTML = `
        <table>
        <tr>
        <th>Type</th>
        <th>Number</th>
        <tr>
        <td>User Input (Binary)</td>
        <td>${input}</td>
        </tr>
        <tr>
        <tr>
        <td>Octal</td>
        <td>${octalResult}</td>
        </tr>
        <tr>
        <td>Decimal</td>
        <td>${decimalResult}</td>
        </tr>
        <tr>
        <td>Hex</td>
        <td>${hexResult}</td>
        </tr>
        `;
}

// Helper method: check if binary number is compatible with hex conversion
function binaryCheck(number) {
    let numberStr = number.toString();
    while( numberStr.length % 4 != 0) {
        // console.log(number)
        numberStr =  `0${numberStr}`;
        // console.log(numberStr)
        // binaryCheck(numberStr)
    }
    return numberStr;
}

// Fully converts a binary number into a hexidecimal number
function binaryToHex(number) {
    let hexArr = new Array();
    number = number.toString();
    number = binaryCheck(number);
    for (let i = 0; i < number.length; i+=4) {
        let binaryNumber = number.substring(i, i+4);
        // console.log(binaryNumber);
        hexArr.push(binaryNumber);
        }

    // console.log(hexArr);
    for (let i = 0; i <= hexArr.length - 1; i++) {
        // console.log(hexArr[i]);
        hexArr[i] = hexCodeConverter(hexArr[i]);
    } 

    return hexArr.join('');

}

// Helper method : coverts every 4 bianry digits into a hex code
function hexCodeConverter(hexCode) {
    switch(hexCode) {
        case "0000" : return "0";
        break;
        case "0001" : return "1";
        break;
        case "0010" : return "2";
        break;
        case "0011" : return "3";
        break;
        case "0100" : return "4";
        break;
        case "0101" : return "5";
        break;
        case "0110" : return "6";
        break;
        case "0111" : return "7";
        break;
        case "1000" : return "8";
        break;
        case "1001" : return "9";
        break;
        case "1010" : return "A";
        break;
        case "1011" : return "B";
        break;
        case "1100" : return "C";
        break;
        case "1101" : return "D";
        break;
        case "1110" : return "E";
        break;
        case "1111" : return "F";
        break;
    }
}

// Convert decimal to any baseNumber ----------------------------------------------------
function convertByDivision(baseNumber, inputNumber) {
    let result;
    arr = recursiveDivide(baseNumber, inputNumber, arr);
    result = Number(arr.reverse().join(''));
    // result = Math.round(100 * result)/100;
    arr = [];
    return result;
}


function recursiveDivide(baseNumber, inputNumber) {
    let binaryCode;
    binaryCode = inputNumber % baseNumber;
    inputNumber -= binaryCode;
    inputNumber /= baseNumber;
    // console.log(inputNumber);
    // console.log(binaryCode);
    arr.push(binaryCode);
    if (inputNumber > 0) {
        recursiveDivide(baseNumber, inputNumber)
    }
    return arr;

}

//Convert binary to decimal -----------------------------------------------------------------------------------
function binaryToDecimal(number) {
    number = number.toString();
    let decimal = 0;
    let binaryLength = number.length;
    for (let i = binaryLength - 1; i >= 0; i--) {
        if(number[i] == '1') {
            decimal += Math.pow(2, binaryLength - 1 - i);
        }
    }
    return decimal;
}


//convert decimal portion of number to binary ----------------------------------------------------------------------------------
function decimalToBinary(decimalNumber) {
    console.log(decimalNumber);
    let numberParts = decimalNumber.toString().split('.');
    let wholeNumber = Number(numberParts[0]);
    decimalPart = decimalNumber - wholeNumber;
    decimalPart = decimalSeperator(decimalPart);
    console.log(decimalPart);
    console.log(wholeNumber);
    decimalPart= recursiveMultiply(decimalPart);
    decimalPart = Number(decimalPart.join(''));
    result = `${wholeNumber}.${decimalPart}`;
    result = Number(result);
    return result;
}

function decimalSeperator(decimalNumber) {
    let numberParts = decimalNumber.toString().split('.');
    let wholeNumber = parseInt(numberParts[0]);
    decimalNumber = decimalNumber - wholeNumber;
    return decimalNumber;
}

function recursiveMultiply(decimalNumber) {
    let numberParts;
    let binaryPart;
    let decimalPart;

    decimalNumber *= 2;
    numberParts = decimalNumber.toString().split('.');
    // console.log(numberParts);
    binaryPart = Number(numberParts[0]);
    // console.log(binaryPart);
    decimalPart = Number(numberParts[1])
    if(binaryPart == 1) {
        arr2.push(1);
    } else {
        arr2.push(0);
    }
    decimalPart = decimalPart.toString() ;
    decimalPart = Number('.' + decimalPart);
    if (numberParts.length != 1) {
        recursiveMultiply(decimalPart);
    }
    // console.log(arr2);
    return arr2;
    

}



// Prompt user for number and number type --------------------------------------------
function promptUser() {

    try {
        //test a block of code for errors
        userInput = prompt("Enter a number in binary or decimal")
        console.log(userInput);
        if (isNaN(userInput) == true || userInput == null || userInput == "") {
            throw new RangeError("Input is not a number.");
        }  
    }
    
    catch (e) {
        while(isNaN(userInput) == true || userInput == null || userInput == "") {
            alert("Input was not a number in binary or decimal");
            console.log(e.message);
            userInput = prompt("Enter a number in binary or decimal");
        }
    }  
    typeCheck();  

}

// promptUser() helper method: Checks number type
function typeCheck() {
    let binaryTest;
    try {
        typeOfNumber = prompt('Is the number a "Binary" or "Decimal" number?')
        typeOfNumber.toLowerCase();
        if(typeOfNumber != "decimal" && typeOfNumber != "binary") {
            throw new RangeError('Input is not "Decimal" or "Binary".')
        }
        if (typeOfNumber == "binary") {
            binaryTest = checkBinary(userInput);
            console.log(binaryTest);
            if (binaryTest == false) {
                promptUser()
            }
        }
    }
    catch(e) {
        while(typeOfNumber != "decimal" && typeOfNumber != "binary") {
            console.log(e.message);
            console.log("User Input: " + typeOfNumber);
            alert('Please input "Binary" or "Decimal".')
            typeOfNumber = prompt('Is the number a "Binary" or "Decimal" number?')
            typeOfNumber.toLowerCase();
        }
        
    }
}


function checkBinary(str) {
    str = str.toString();
    let isBinary = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "0" || str[i] == "1") {
            isBinary = true;
        } else {
            isBinary = false;
            alert('You inputed "Binary" with an invalid binary number.')
            return isBinary;
        }
    }
    
}



