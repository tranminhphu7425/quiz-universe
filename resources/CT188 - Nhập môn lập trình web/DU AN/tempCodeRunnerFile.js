const cars = new Array("Phantom", "John", "BMW");
const cars1 = ["Phantom1", "John1", "BMW1"];
var cars2 = cars.concat(cars1); // ["Phantom", "John", "BMW", "Phantom1", "John1", "BMW1"]
var cars3 = cars.join("+"); // Phantom+John+BMW
var cars4 = cars.slice(1, 3); // index bắt đầu từ 1 // ["John", "BMW"]
var cars5 = cars.reverse(); // ["BMW", "John", "Phantom"]
var cars6 = cars.values();
const cars6Array = [...cars6]; // Store values in an array
console.log(cars6Array); // ["BMW", "John", "Phantom"]
for (let car of cars6Array) {
  console.log(car);
}
// Kết quả:
// Phantom
// John
// BMW
var cars7 = cars.pop(); // ["BMW", "John"]
cars.push("John2"); // ["BMW", "John", "John2"]
var car8 = cars.shift(); //"BMW"  cars = ["John", "John2"]]
cars.sort();



var itemList = {
  sp001: {
    name: "Áo thun nam",
    price: 200000,
    photo: "https://example.com/photo1.jpg",
  },
  sp002: {
    name: "Quan jean nam",
    price: 200000,
    photo: "https://example.com/photo2.jpg",

  },



};