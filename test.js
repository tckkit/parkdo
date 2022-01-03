// console.log(new Date("2022-01-01T09:10:10").toLocaleTimeString());
// console.log(new Date().toLocaleTimeString());

let a = new Date("2022-01-02T23:21").getDate();
console.log(a);
let b = new Date("2022-01-02T23:31").getDate();
console.log(b);
let c = b - a;

console.log(c);
