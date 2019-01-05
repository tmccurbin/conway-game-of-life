// CIS 197 - React HW

import _ from 'lodash';
import React from 'react';
import Cell from './Cell';
import * as initialState from '../initialState.js';
import * as actions from '../actions/index.js';


export default class GameOfLife extends React.Component {
  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  // NOTE: further down in the render function, you will need to
  //       access this.state.cells and this.state.x and this.state.y.
  //       For these attributes, be sure to use this.state and not this.props
  constructor() {
    super();
    this.state = initialState;
    this.onImportSeed = this.onImportSeed.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onStep = this.onStep.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onExportMap = this.onExportMap.bind(this);
    this.onRandomSeed = this.onRandomSeed.bind(this);
  }

  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  onImportSeed(seedName) {
    this.props.store.dispatch(actions.importSeed(seedName));
  }

  // I created this function to organize my code
  generateCell(cell, index) {
    if (this.state.cells[index] === true) {
      return <Cell store={this.props.store} alive={true} key={index} index={index}/>
    }
    return <Cell store={this.props.store} alive={false} key={index} index={index}/>
  }

  // TODO: here you'll want to implement the functions that get called
  //       when various actions (such as button clicks) occur in thie view.
  //       These functions should, like onImportSeed above, dispatch the
  //       appropriate actions using the Redux store prop.

  onRun() {
    this.props.store.dispatch(actions.run());
  }

  onStep() {
    this.props.store.dispatch(actions.step());
  }

  onStop() {
    this.props.store.dispatch(actions.stop());
  }

  onClear() {
    this.props.store.dispatch(actions.clear());
  }

  onExportMap() {
    this.props.store.dispatch(actions.exportMap());
  }

  onRandomSeed() {
    this.props.store.dispatch(actions.randomSeed());
  }

  // TODO: Generate the following HTML structure:
  // <div class="game-component">
  //   <div class="board-component" style="width=900px">
  //     <span class="cell-widget cell"></span>
  //     <span class="cell-widget cell"></span>
  //     <span class="cell-widget cell alive "></span>
  //      ...remaining cells
  //   </div>
  //   <div class="controls">
  //     <h4>Controls</h4>
  //     <button>run</button>
  //     <button>step</button>
  //     <button>stop</button>
  //     <button>clear</button>
  //     <button>export map</button>
  //   </div>
  //   <div class="seeds">
  //     <button>glider</button>
  //     <button>glider gun</button>
  //     <button>acorn</button>
  //     <button>line</button>
  //     <button>random</button>
  //   </div>
  // </div>
  //
  // HINT: Use the `onClick` prop on your buttons to register click callbacks!
  // NOTE: Please make sure your button text matches the button text above,
  //       as this is necessary for the test suite.
  //       (e.g. your 'step' button should have button text 'step',
  //        and your 'glider gun' button should have button text 'glider gun')
  // HINT: Remember to pass the store as a prop of each <Cell> component
  // HINT: Remember that the application state's `x`, `y`, and `cells` values
  //       are located in this.state and not this.props.

  render() {
    return (
      <div className="game-component container">

        <div className="row" id="top-banner">
          <div className="col" id="steps">STEPS</div>
          <div className="col" id="living-cells">LIVING CELLS</div>
          <div className="col" id="score">SCORE</div>
          <div className="col" id="high-score">HIGH SCORE</div>
          <div className="w-100"></div>
          <div className="col stats">{this.state.steps}</div>
          <div className="col stats">{this.state.livingCells}</div>
          <div className="col stats">{this.state.score}</div>
          <div className="col stats">{this.state.highSchore}</div>
        </div>

        <h1 className="title">Conway's Game of Life!</h1>

        <div className="board-component" style={{width: this.state.x * 10 + 'px', height: this.state.y * 10 + 'px'}}>
          {this.state.cells.map(this.generateCell.bind(this))}
        </div>

        <div className="row justify-content-center">
          <div className="col-4 controls">
            <h4 className="button-header">Controls</h4>
            <button className="my-button col-4" onClick={this.onRun}>run</button>
            <button className="my-button col-4"onClick={this.onStep}>step</button>
            <button className="my-button col-4" onClick={this.onStop}>stop</button>
            <button className="my-button col-6" onClick={this.onClear}>clear</button>
            <button className="my-button col-6" onClick={this.onExportMap}>export</button>
          </div>

          <div className="col-4 seeds">
            <h4 className="button-header">Patterns</h4>
            <button className="my-button col-6" onClick={this.onImportSeed.bind(null, 'GLIDER')}>glider</button>
            <button className="my-button col-6" onClick={this.onImportSeed.bind(null, 'GLIDER_GUN')}>emitter</button>
            <button className="my-button col-4" onClick={this.onImportSeed.bind(null, 'ACORN')}>acorn</button>
            <button className="my-button col-4" onClick={this.onImportSeed.bind(null, 'LINE')}>line</button>
            <button className="my-button col-4" onClick={this.onRandomSeed}>random</button>
          </div>
        </div>

        <div className="row instructions justify-content-center">
          <div className="col-3 instructions-header">INSTRUCTIONS:</div>
          <div className="col-9 instructions-text">SELECT CELLS AND PATTERNS. PRESS 'RUN' FOR RESULTS!</div>
        </div>
        
      </div>
    )
  }
}