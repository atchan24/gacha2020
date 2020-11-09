import React from 'react';
import {Button} from 'react-bootstrap';
import './App.css';

export class RollButton extends React.Component {
    render() {
      let rollCost = "Scout a player: -" + this.props.rollCost;
      return (
        <button>
          <Button variant="warning" size="lg" style={{ width: '18rem'}}>{rollCost}</Button>
        </button>
      );
    }
  }

export default RollButton;