
import React from 'react';
import {Card} from 'react-bootstrap';
import './App.css';

export class PlayerCard extends React.Component {

    constructor(props){
      super(props);
    }
  
    render() {
      let description = this.props.description; 
      let imgPath = "/img/" + this.props.name + ".png";
      return (
        <Card style={{ width: '18rem'}}>
          <Card.Img variant="top" src={imgPath}/>
          <Card.Footer> {description} </Card.Footer>
        </Card>
        );
    }
  }
  
export default PlayerCard;
  