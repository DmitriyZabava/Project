export default function intToArray(int) {
    const newArray = [];
    for (let i = 0; i < int; i += 1) {
        newArray.push(i + 1);
    }
    return newArray;
}
