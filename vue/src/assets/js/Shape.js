export class Shape {
  constructor() {
    this.shapeTable = {
      0: [
        [
          [0, 1],
          [0, 2],
          [1, 1],
          [1, 2],
        ],
      ],
      1: [
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
        ],
        [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
        ],
      ],
      2: [
        [
          [0, 1],
          [0, 2],
          [1, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 1],
        ],
      ],
      3: [
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 2],
        ],
        [
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 0],
        ],
      ],
      4: [
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 1],
        ],
        [
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 1],
        ],
        [
          [0, 1],
          [1, 0],
          [1, 1],
          [1, 2],
        ],
        [
          [0, 1],
          [1, 1],
          [1, 2],
          [2, 1],
        ],
      ],
      5: [
        [
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2],
        ],
        [
          [0, 1],
          [1, 1],
          [2, 1],
          [2, 2],
        ],
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [2, 1],
        ],
      ],
      6: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [1, 2],
        ],
        [
          [0, 1],
          [0, 2],
          [1, 1],
          [2, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 2],
        ],
        [
          [0, 1],
          [1, 1],
          [2, 0],
          [2, 1],
        ],
      ],
    };
    this.type = 0;
    this.rotation = 0;
    this.xOffset = 3;
    this.yOffset = this.type === 1 ? -1 : -2
  }

  getPiece() {
    this.getType()
    return this.shapeTable[this.type][this.rotation]
  }

  getType() {
    this.type = Math.floor(Math.random() * 7)
  }
}
