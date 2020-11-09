import React from 'react';
import {Button} from 'react-bootstrap';
import './App.css';

export class VentureCapitalButton extends React.Component {
    render() {
      return (
        <button>
        <Button variant="secondary" size="lg" style={{ width: '18rem'}}>Raise Venture Capital: +100</Button>
        </button>
      );
    }
  }

  export default VentureCapitalButton;