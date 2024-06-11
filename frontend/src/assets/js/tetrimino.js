import { palette } from "@/assets/js/palette.js";

const tetriminoColor = palette.tetriminoColor;

const tetriminoes = {
  O: {
    name: "O",
    type: 1,
    color: tetriminoColor[0],
    pieces: [
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [1, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, -1],
        [-1, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [-1, 1],
      ],
    ],
  },
  I: {
    name: "I",
    type: 2,
    color: tetriminoColor[1],
    pieces: [
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 0],
        [0, 1],
        [0, -1],
        [0, -2],
      ],
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [-2, 0],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [0, 2],
      ],
    ],
  },
  T: {
    name: "T",
    type: 3,
    color: tetriminoColor[2],
    pieces: [
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
      ],
    ],
  },
  S: {
    name: "S",
    type: 4,
    color: tetriminoColor[3],
    pieces: [
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, -1],
      ],
      [
        [0, 0],
        [-1, -1],
        [1, 0],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, -1],
      ],
    ],
  },
  Z: {
    name: "Z",
    type: 5,
    color: tetriminoColor[4],
    pieces: [
      [
        [0, 0],
        [-1, 1],
        [1, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [1, 1],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, -1],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [-1, -1],
      ],
    ],
  },
  J: {
    name: "J",
    type: 6,
    color: tetriminoColor[5],
    pieces: [
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [-1, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 1],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [1, -1],
      ],
      [
        [0, 0],
        [-1, -1],
        [0, 1],
        [0, -1],
      ],
    ],
  },
  L: {
    name: "L",
    type: 7,
    color: tetriminoColor[6],
    pieces: [
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [0, 0],
        [1, -1],
        [0, 1],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [-1, -1],
      ],
      [
        [0, 0],
        [-1, 1],
        [0, 1],
        [0, -1],
      ],
    ],
  },
};

function shuffleBag() {
  const arr = ["I", "J", "L", "O", "S", "T", "Z"];

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function getBags() {
  const result = [];
  const bag = shuffleBag();

  for (let i = 0; i < bag.length; i++) {
    result.push(tetriminoes[bag[i]]);
  }

  return result;
}
