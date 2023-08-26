const keypadLayout = {
    '1': [],
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
    ' ': [' '],
    '*': ['*'],
    '#': ['#'],
};
export function action(msg : string, xSender : string){
    var convertedText = ''
    if (xSender === 'earth') {
        convertedText = stringToNokiaKeypad(msg)
    } else if (xSender === 'mars') {
        convertedText = nokiaKeypadTostring(msg)
    }else{
        throw new Error('Invalid Sender name: ' + xSender);
    }
    
    return convertedText;
}

export function stringToNokiaKeypad(str : string) : string {
    str = str.toLowerCase();
    let result = '';
    let prevkeypadkey = null;
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let keypadKey = null;
        // console.log("RESULT --------------------------------", result)
        for (const key in keypadLayout) {
            if (keypadLayout[key].includes(char)) {
                keypadKey = key;
                break;
            }
        }
        if (keypadKey !== null) {
            const keyIndex = keypadLayout[keypadKey].indexOf(char);
            if (prevkeypadkey == keypadKey) result += '.';
            prevkeypadkey = keypadKey
            result += keypadKey.repeat(keyIndex + 1);
        }
    }
    return result;
}

export function nokiaKeypadTostring(nokiaNumbers : string) {
    let result = '';
    let currentKey = '';
    let keyCount = 0;

    for (let i = 0; i < nokiaNumbers.length; i++) {
        if ((currentKey === '' || nokiaNumbers[i] === currentKey)) {
            currentKey = nokiaNumbers[i];
            if (keyCount == keypadLayout[currentKey].length) {
                const charIndex = (keyCount - 1) % keypadLayout[currentKey].length;
                result += keypadLayout[currentKey][charIndex];
                keyCount = 1;
            } else
                keyCount++;

        } else {
            if (nokiaNumbers[i] == '.') {
                const charIndex = (keyCount - 1) % keypadLayout[currentKey].length;
                result += keypadLayout[currentKey][charIndex];
                keyCount = 0;
            } else {
                const charIndex = (keyCount - 1) % keypadLayout[currentKey].length;
                result += keypadLayout[currentKey][charIndex];
                currentKey = nokiaNumbers[i];
                keyCount = 1;
            }
        }
        // console.log("Keypad To STRING: " + result);
    }

    if (currentKey !== '') {
        const charIndex = (keyCount - 1) % keypadLayout[currentKey].length;
        result += keypadLayout[currentKey][charIndex];
    }
    // console.log("Keypad To STRING: " + result);

    return result;
}



// Example usage
// // var inputString = 'idiot i am elon not houston';
// var inputString = 'hello i am deepesh kushwaha';
// // const inputString = 'hello';
// const nokiaKeypadNumbers = stringToNokiaKeypad(inputString);
// console.log(nokiaKeypadNumbers); // Output: 4433555555666




// // Example usage
// const nokiaNumbers = '4433555.555666 444 26 3.33.33733777744 558877774492442' //'44434446668044402603355566666066.6668044666887777866666';
// // 8044666887777866666
// const originalString = nokiaKeypadTostring(nokiaNumbers);
// console.log("\n ----------------------------------------------------------------")
// console.log("\n")
// console.log("Numbers to String >>>>>>>", originalString); // Output: "houston"
// console.log("\n ----------------------------------------------------------------")
// console.log("\n")
// console.log("String To Numbers", nokiaKeypadNumbers); // Output: 4433555555666
// console.log("\n ----------------------------------------------------------------")
