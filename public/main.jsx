// CIS 197 - React HW
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers';
import GameOfLife from './components/GameOfLife';
import * as initialState from './initialState';
import * as actions from './actions/index';
import * as timer from './timer';

const store = createStore(reducers, initialState);
timer.setStore(store);

const gameOfLife = <GameOfLife store={store}/>;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    gameOfLife,
    document.getElementById('react-app-container')
  );
});