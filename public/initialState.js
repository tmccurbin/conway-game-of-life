// CIS 197 - React HW

const x = 48;
const y = 36;

const cells = Array.apply(null, Array(x * y)).map(() => {
    return false;
});

// New features as of 7/25/2018
let steps = 0;
let livingCells = 0;
let score = 0;
let highSchore = 0;

/*
const cells = Array.apply(null, Array(x * y)).map((element, index) => {
    return index % 2 === 0 ? false : true
});
*/

export { x, y, cells, steps, livingCells, score, highSchore }
