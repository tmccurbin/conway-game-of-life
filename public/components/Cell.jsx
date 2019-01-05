// CIS 197 - React HW

import React from 'react';
import * as actions from '../actions/index.js';

export default class Cell extends React.Component {

  constructor() {
    super();
    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick() {
    // TODO: Write the code to dispatch the action corresponding to the
    //       clicking of a cell at a particular index.
    this.props.store.dispatch(actions.cellClicked(this.props.index))
  }

  render() {
    // TODO: complete the render function.
    //       A non-living cell has the HTML structure
    //       <span class="cell-component cell"></span>
    //       while a non-living cell has the HTML structure
    //       <span class="cell-component cell alive"></span>
    // HINT: don't forget to implement the click handler
    //       whose execution dispatches a CELL_CLICKED event.
    if (this.props.alive) {
      return (<span className="cell-widget cell alive" onClick={this.onCellClick}></span>)
    }

    return (<span className="cell-widget cell" onClick={this.onCellClick}></span>)
  }
}

Cell.defaultProps = {
  alive: false,
  index: 0
};

