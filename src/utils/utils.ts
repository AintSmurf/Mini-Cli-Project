function palindrome(str: string): Boolean {
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
    return reverseStr === lowRegStr;
}
function checkLowerCase(str: string): Boolean {
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
            continue;
        }
        else { return false };
    }
    return true;
}
function checkifItsNumber(str: string): Boolean {
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
            continue;
        }
        else { return false };
    }
    return true;
}
function checkifItsArmStrong(str: string): Boolean {
    let arr = []
    let sum = 0;
    if (checkifItsNumber(str)) {
        for (let i = 0; i < str.length; i++) {
            arr.push(str[i]);
            sum += Math.pow(parseInt(str[i]!), 3);
        }
        return parseInt(arr.reverse().join('')!) === sum

    }
    return false;
}
export {
    palindrome,
    checkLowerCase,
    checkifItsNumber,
    checkifItsArmStrong
}