export const convertNumber = (string) => {
    let result = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== ".") {
            result += string[i];
        }
    }
    return result;
};
export const addString = (string) => {
    let div = string.length % 3;
    let i = div === 0 ? 3 : div
    let result = string.substring(0, i);
    let count = 0;
    for (i; i < string.length; i++) {
        if (count === 0 && string.length > 3) {
            count++
            result += "."
        }
        if (i > 3 && (i - div) % 3 === 0 && string[i] !== ".") {
            result += ".";
        }
        result += string[i];
    }
    return result;
};