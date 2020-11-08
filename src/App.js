import * as React from 'react';
import './App.css';
import {Card, Button, Row, Col, Container, Alert, Spinner, Navbar, Nav, NavDropdown, ListGroup, ListGroupItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <HeaderNav/>
        </header>
        <main>
          <Container fluid>
            <Row>
              <Col sm={4}>
                <RollButton/>
                <VentureCapitalButton/>
              </Col>
              <Col sm={8} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
                <PlayerCard name="Josephine Liu" power={300} rarity={3} description="Sleep Deprived Memester" salary={50} income={50} className="p-2"/>
              </Col>
            </Row>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export class HeaderNav extends React.Component {
  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>E-Gacha</Navbar.Brand>
      </Navbar>
    );
  }
}

export class RollButton extends React.Component {
  render() {
    return (
      <Button variant="warning" size="lg" style={{ width: '18rem'}}>Roll: -5</Button>
    );
  }
}

export class VentureCapitalButton extends React.Component {
  render() {
    return (
      <Button variant="secondary" size="lg" style={{ width: '18rem'}}>Raise Venture Capital: +100</Button>
    );
  }
}


export class PlayerCard extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    let name = this.props.name; 
    let rarity = this.props.rarity; 
    let description = this.props.description;
    let salary = this.props.salary;
    let income = this.props.income;
    let power = this.props.power;
    let stars = ""
    for (let i = 0; i < rarity; i++) {
      stars += "★";
    }
    return (
      <Card style={{ width: '18rem'}}>
        <Card.Header as="h5">{stars}</Card.Header>
        <Card.Img variant="top" src="/jowosie.jpg"/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroupItem><b>Power:</b>  {power}</ListGroupItem>
            <ListGroupItem><b>Salary:</b> {salary}</ListGroupItem>
            <ListGroupItem><b>Income:</b> {income}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
      );
  }
}

export default App;
