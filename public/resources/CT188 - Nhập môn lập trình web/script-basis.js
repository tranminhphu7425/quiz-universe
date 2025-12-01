function test() {
    var x = 5;
    console.log(x); // output: 5
    let y = 10;
    console.log(y); // output: 10
    console.log(z); // output: undefined
    var z = 2;
    console.log(a); // output: error a is not defined
    let a = 3;
}

test();
console.log(x); // output: error x is not defined