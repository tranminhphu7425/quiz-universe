str = "ABCDEFGHIJKLMNOPQRSTU";
console.log("length: " + str.length); // length: 26
console.log(str.indexOf("C")); // 2
console.log("ABACA".lastIndexOf("A")); // 4
console.log("Hello World".slice(6, 11)); //World
console.log("Hello World".substr(6, 5)); //World
console.log("Apple, Banana, Kiwi".slice(-12, -6)); //Banana
console.log("ABC".toLowerCase()); //abc
console.log(" THUc tron   ".trim());  //THUc tron
console.log("ABC".charAt(2)); //C
console.log("ABC".charCodeAt(2)); //67 (C)
console.log("A, B, C".split(",")); // ["A", "B", "C"]
console.log("Hello".replace("Hello", "World")); //World










var fruit = ["apple", "banana", "cherry"];
fruit.forEach(function (e, i) {
  console.log(i + ": " + e);
});
//0: apple
//1: banana
//2: cherry

var num = 0;
switch (num) {
  case 0:
    console.log("Less than 0.");
    break;
  case 1:
    console.log("Equal to 0.");
    break;
  case 2:
    console.log("Greater than 0.");
    break;
  default:
    console.log("Unknown.");
}

//Khai báo hàm
function sum1(a, b) {
  return a + b;
}
var sum2 = (a, b) => {
  return a + b;
};

console.log(sum1(5, 7)); // 12
console.log(sum2(10, 20)); // 30

function logger(msg) {
  console.log(msg);
  console.log(arguments[0]);
}
logger("Hello", "World"); // Hello Hello

function sum(...args) {
  let total = 0;
  for (let i in args) total += args[i];
  return total;
}
var t = sum(1, 2, 3);
console.log(t); //6

function fun2(str, myfunc) {
  console.log("Welcome");
  myfunc(str);
}
fun2("World", function (str) {
  console.log("Hello " + str);
}); // Welcome Hello World

var myCar = new Object();
myCar.make = "Toyota";
myCar.model = "Camry";

var object = {
  name: "John Doe",
  age: 30,
  city: "New York",
  printDetails: function () {
    console.log("Name: " + this.name);
    console.log("Age: " + this.age);
    console.log("City: " + this.city);
  },
};

console.log(object.name); //John Doe
console.log(object.printDetails()); //Name: John Doe Age: 30 City: New York

var profile2 = Object.create(object);
console.log(profile2.name); //John Doe
console.log(profile2.printDetails()); //Name: John Doe Age: 30 City: New York

function Profile(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city;
  this.printDetails = function () {
    console.log("Name: " + this.name);
    console.log("Age: " + this.age);
    console.log("City: " + this.city);
  };
}
var profile1 = new Profile("John", 10, "New York");
profile1.printDetails(); //Name: John Age: 10 City: New York
profile1.name = "Phu"; //Cach 1
profile1["name"] = "John"; //Cach 2
Object.defineProperty(profile1, "name", { value: "John", writable: true }); //Cach 3

console.log("----------------------------------------------------------------"); //John
console.log("Mang");

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
var cars7 = cars.pop(); 
console.log(cars7); //Phantom

cars.push("John2"); // ["BMW", "John", "John2"]
var car8 = cars.shift(); //"BMW"  cars = ["John", "John2"]
cars.sort();

var obj = new Date();

console.log(obj.getDate()); //Trả về giá trị ngày (1-31)
console.log(obj.getDay()); //Trả về giá trị ngày trong tuần (0-6) 0 là ngày chủ nhật
console.log(obj.getMonth()); //Trả vè giá trị tháng trong năm (0-11) 0 là tháng 1
console.log(obj.getFullYear()); //Trả về năm (4 số)
console.log(obj.getYear()); //Trả về năm (2 số)
console.log(obj.getMinutes());
console.log(obj.getHours()); //Trả về giờ của hệ thống (0-23)
console.log(obj.getSeconds());
console.log(obj.getHours());



//full Math Object example

console.log(Math.PI); // π = 3.14159
console.log(Math.abs(-10)); // | -10 | = 10
console.log(Math.acos(1))  //acos(1) = 0;
console.log(Math.ceil(1.1))  //trả về số lớn hơn hoặc bằng x 2
console.log(Math.floor(1.1))  //trả về số lớn hơn hoặc bằng x 0
console.log(Math.log(10))  //log4 = ?
console.log(Math.max(1, 2, 3, 4, 5)); //max(1, 2, 3, 4, 5) = 5
console.log(Math.min(1, 2, 3, 4, 5)); //max(1, 2, 3, 4, 5) = 1
console.log(Math.pow(2, 3)); //pow(2, 3) = 8
console.log(Math.random()); //random number between 0 and 1
console.log(Math.round(12.5)); //13
console.log(Math.sqrt(16)); // sqrt(16) = 4


