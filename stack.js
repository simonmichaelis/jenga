
  // TODO fix stack length and move it to constructor

  var Layer = require("./layer.js");

  class Stack {

    layers;

    /*
      Creates a new stack and fills it with layers of Bricks
    */
    constructor() {
      this.layers = [];

      var orientationToggle = true;

      for (var i = 0; i < 18; i++) {
        if (orientationToggle) {
          this.layers[i] = new Layer(Layer.orientationNorth);
          orientationToggle = false;
        } else {
          this.layers[i] = new Layer(Layer.orientationWest);
          orientationToggle = true;
        }
      }
    }


    /*
      check if the Stack would collapse when removing a certain brick
    */
    checkStability(level, brickNo) {
      var bricks = this.layers[level].getBricks();

      if (brickNo == 0 && bricks[1] == false) {
        return false;
      } else if (brickNo == 2 && bricks[1] == false) {
        return false;
      } else if (brickNo == 1 && bricks[0] == false || bricks[2 == false]) {
        return false;
      } else {
        return true;
      }
    }


    checkifAllowed(level) {
      var isAllowed;
      if (this.getLastLayer().isFull()) {
        if (level < this.layers.length - 3) {
          return true;
        } else {
          return false;
        }
      } else {
        if (level < this.layers.length - 4) {
          return true;
        } else {
          return false;
        }
      }
    }


    /*
      Removes a brick from the stack and places it back on top.
      Checks if a move is allowed (not the three top full layers) and if
      the tower would be stable after the move. If not, returns false and
      doesnt remove the brick
    */
    removeBrick(level, brickNo) {
      var currentLayer = this.layers[level];
      var bricks = currentLayer.getBricks();

      var wouldNotCollapse = this.checkStability(level, brickNo);

      if (this.checkifAllowed(level)) {
        if (wouldNotCollapse) {
          bricks[brickNo] = false;
          this.layers[level].setBricks(bricks);

          // if the last layer is full, create a new layer and add the removed
          // brick there
          if(this.getLastLayer().isFull()) {
            var newLayer = {
              orientation: null,
              bricks: [true, false, false]
            };

            // get the orientation of the top layer and set the orientation of the
            // new layer to the opposite orientation
            if (this.getLastLayer().getOrientation == Layer.orientationNorth) {
              newLayer.orientation = Layer.orientationWest;
            } else {
              newLayer.orientation = Layer.orientationNorth;
            }

            this.layers.push(new Layer(newLayer.orientation, newLayer.bricks));
          } else {
            // if the top layer is not full, add the brick there
            this.getLastLayer().addBrick();
          }

          return true;
        } else {
          console.log("### Move is allowed but tower would collapse.")
          return false;
        }
      } else {
        console.log("### Move not allowed.");
        return false;
      }
    }


    getLastLayer() {
      return this.layers[this.layers.length-1];
    }


    /*
      Renders a single layer for console output and returns it as a string
    */
    renderLayer(currentLayer) {
      var rendering = "";

      if (currentLayer.getOrientation() == Layer.orientationNorth) {
        currentLayer.getBricks().forEach((brick) => {
          if (brick) {
            rendering += "/";
          } else {
            rendering += " ";
          }
        });
      } else {
        currentLayer.getBricks().forEach((brick) => {
          if (brick) {
            rendering += "-";
          } else {
            rendering += " ";
          }
        });
      }

      return rendering;
    }


    render() {
      console.log("Stack:");
      for (var i = this.layers.length-1; i >= 0; i--) {
        console.log(this.renderLayer(this.layers[i]) + "   " + i);
      }
    }

  }

  module.exports = Stack;
