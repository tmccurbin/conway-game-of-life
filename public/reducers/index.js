// CIS 197 - React HW

import _ from 'lodash';
import * as timer from '../timer.js';
import * as initialState from '../initialState.js';
import { stat } from 'fs';

// Every time an action is dispatched, this function is called.
// Using the current state and the action just performed (along with
// any payload data associated with it), this function computes the
// next state.
// HOWEVER, note that you CANNOT mutate the state variable directly.
// Instead, you want return a new, updated copy of the state in the
// reducer each time it is called (an easy way to do this is to use
// lodash's _.assign function).
//
// TODO: Implement the following cases:
//       'STOP' - stop the animation by stopping the timer
//       'STEP' - use the updateCells function below to update the cells array
//       'CLEAR' - set the grid to an empty grid and stop the animation
//       'RANDOM_SEED' - set the cells array to a randomly-generated grid
//       'IMPORT_SEED' - update the cells array to the action's seed payload
//                       and stop the animation if necessary.
const mainReducer = (state, action) => {
  switch (action.type) {
  case 'RUN': {
    timer.run();
    return state;
  }

  case 'STOP': {
    timer.stop();
    return state;
  }

  case 'STEP': {
    let newCells = updateCells(state);
    /* Average number of cells */
    let theNewScore = Math.round((state.livingCells + (state.score * state.steps)) / (state.steps + 1));
    
    return _.assign(
      {},
      state,
      {
        cells: newCells,
        steps: state.steps + 1,
        livingCells: countLivingCells(newCells),
        score: theNewScore,
        highSchore: state.highSchore < theNewScore ? theNewScore : state.highSchore 
      }
    );
  }

  case 'CLEAR': {
    timer.stop();
    return _.assign({}, state, {cells: state.cells.map(() => false), steps: 0, livingCells: 0, score: 0})
  }

  case 'RANDOM_SEED': {
    let newCells = randomSeed(state)
    return _.assign(
    {},
    state,
    {
      cells: newCells,
      steps: 0,
      livingCells: countLivingCells(newCells)
    }
  );
  }

  case 'IMPORT_SEED': {
    return _.assign(
      {},
      state,
      {
        cells: action.seed,
        livingCells: action.seed.reduce((sum, curr_val) => sum + curr_val)
      }
    );
  }

  case 'EXPORT_MAP': {
    let data = encodeURIComponent(state.cells);
    return document.location = `/export?data=[${data}]`;
  }

  case 'CELL_CLICKED': {
    let cells = state.cells.slice(0);
    cells[action.index] = !cells[action.index];
    return _.assign({}, state, {cells: cells});
  }
  }
  return state;
};

const randomSeed = (state) => {
  // TODO: Return a (NEW) randomly generated array of true/false values
  // the same length as state.cells
  return state.cells.map(() => Math.random() >= 0.5 ? true : false);
};

// This is the main algorithm behind the Game of Life simulation.
// Every time it is called, it computes based on the current state's
// cells the NEXT state's cells and return a copy of the new cells array.
//
// The algorthim determines cell state based on the states of neighbouring
// cells for each iteration according to these rules:
//
// 1 - Any live cell with fewer than two live neighbours dies,as if caused by
//     under-population.
// 2 - Any live cell with two or three live neighbours lives on to the next
//     generation.
// 3 - Any live cell with more than three live neighbours dies, as if by
//     overcrowding.
// 4 - Any dead cell with exactly three live neighbours becomes a live cell,
//     as if by reproduction.
//
const updateCells = (state) => {
  // Create a 1D array the length of the number of cells
  let newCells = new Array(state.cells.length);

  state.cells.map((_, i) => {
    // Copy the cell from the state
    let cell = state.cells[i];
    let live_neighbors = 0;
    // Compute the x and y position of the cell
    let x = i % state.x;
    let y = Math.floor(i / state.x);
    // Find the positions of the neighboring cells in terms of their 1D array numbers
    let l = x !== 0 && i - 1;
    let r = x !== state.x - 1 && i + 1;
    let t = y !== 0 && i - state.x;
    let b = y !== state.y - 1 && i + state.x;

    let tl, tr, bl, br;
    l && t && (tl = l - state.x);
    l && b && (bl = l + state.x);
    r && t && (tr = r - state.x);
    r && b && (br = r + state.x);

    // Sum the number of live neighbors
    [l, r, t, b, tl, bl, tr, br].map( (n) => {
      state.cells[n] && live_neighbors++;
    });

    // Update the newCells array
    newCells[i] = (cell && (live_neighbors === 2 || live_neighbors === 3)) ||
           (live_neighbors === 3);
  });
  return newCells;
};

const countLivingCells = (cellArray) => {
  return cellArray.reduce((accumulator, current_value) => accumulator + current_value);
}

export { mainReducer, updateCells, randomSeed };
