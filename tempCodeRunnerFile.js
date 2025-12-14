<<<<<<< HEAD
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Đợi ${ms}ms xong!`);
    }, ms);
  });
}

wait(2000)
  .then(result => console.log(result))
  .catch(err => console.error(err));


=======
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Đợi ${ms}ms xong!`);
    }, ms);
  });
}

wait(2000)
  .then(result => console.log(result))
  .catch(err => console.error(err));


>>>>>>> parent of 4788f88 (.)
  console.log("Hello world");