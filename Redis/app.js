function outer() {
  let happy;
  return function ineer() {
    console.log(happy);
    return happy++;
  };
}

const out = outer();
out();
out();
