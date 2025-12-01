
    // global variables
    var counter = 1;
    let found = true;
    const PI = 3.14;

    if (found == true) {
        var fruit1 = "Apple"; // global scope
        let fruit2 = "Banana"; // block scope
        const fruit3 = "Cherry"; // block scope
    }

    console.log(fruit1); // Apple
    // console.log(fruit2); // Error! fruit2 is not defined
    // console.log(fruit3); // Error! fruit3 is not defined

    function outerFunc() {
        var outerVar = 'I am from outside!';
        
        function innerFunc() {
            console.log(outerVar); // 'I am from outside!'
            console.log(counter); // 1
            console.log(found); // true
            console.log(PI); // 3.14
        }
        
        return innerFunc();
    }

    outerFunc();
    console.log(outerVar); // ERROR! outerVar is not defined
