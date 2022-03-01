
  class Layer {

    static orientationNorth = "ORIENTATION_NORTH";
    static orientationWest = "ORIENTATION_WEST";

    bricks;

    constructor(Orientation, Bricks) {
      this.orientation = Orientation;
      if (Bricks) {
        this.bricks = Bricks;
      } else {
        this.bricks = [true, true, true];
      }
    }


    setBricks(newBricks) {
      this.bricks = newBricks;
    }


    addBrick() {
      var added = false;

      for (var i = 0; i < 3; i++) {
        if (!added && !this.bricks[i]) {
          this.bricks[i] = true;
          added = true;
        }
      }
    }


    getBricks() {
      return this.bricks;
    }


    getOrientation() {
      return this.orientation;
    }


    isFull() {
      return (this.bricks[0] && this.bricks[1] && this.bricks[2]);
    }
  }

  module.exports = Layer;
