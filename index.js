
  var Stack = require("./stack.js");

  var myStack = new Stack();

  var iterations = 0;
  var level = 0;

  myStack.render();

  while (true) {
    console.log(iterations);

    if (myStack.removeBrick(level, 0)) {
      iterations++;
      myStack.render();
    } else if (myStack.removeBrick(level, 2)) {
      iterations++;
      myStack.render();
    } else {
      level++;
    }

    if (level >= myStack.layers.length) {
      break;
    }
  }

  myStack.render();
