// CIS 197 - React HW

import * as actions from './actions';
let interval = null;
let store = null;

const run = () => {
  if(!interval) {
    interval = setInterval(() => {
      store.dispatch(actions.step());
    }, 1);
  }
}

const stop = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

const setStore = (s) => {
  store = s;
}

export { run, stop, setStore }
