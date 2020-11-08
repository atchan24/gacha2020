import React from 'react';
import './App.css';
import waifus from './waifus.json';
import {Card, Button, Row, Col, Container, Table, Alert, Spinner, Navbar, Nav, NavDropdown, ListGroup, ListGroupItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPowerLevel: 0,
      totalIncome: 0,
      totalExpense: 0,
      totalProfit: 0,
      currentWaifus: [],
      rollCost: 10,
      totalFunds: 100, // Change this number to adjust the starting money
      rates: [0, 70, 95], // Change these numbers to adjust the rates
      secondsTilUpdate: 30, // Change this number to adjust the timing on updates
      secondsTilTourney: 60,
      events: ["Worlds", "MSI", "ESL", "MLG", "TI", "Rivals"],
      requiredPower: 100,
      entryCost: 50,
      firstTimeDebt: true,
    };
    // Probably don't touch these lines
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount = () => {
    window.addEventListener("load", this.startTimer);
  }

  componentWillUnmount = () => {
    window.removeEventListener("load", this.startTimer);
  }

  render = () => {
    // Create an array that we can push waifus to to render
    const waifus = [];
    let temp = this.state.currentWaifus;

    // Add a line for each waifu, this can be modified to anything you want using temp[i]'s fields
    // for (let i = 0; i < temp.length; i++) {
    //   waifus.push(<p>Name: {temp[i].name} | Power Level: {temp[i].power} | Income: {temp[i].income} | Salary: {temp[i].salary}</p>)
    // }

    let cards = temp.map((waifu) => {
      return <PlayerCard name={waifu.name} description={waifu.description} className="p-2"/>
    });

    return (
      <React.Fragment>
        <header>
          <HeaderNav/>
        </header>
        <main>
          <Container fluid>
            <Row>
              <Col sm={4}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th> Field </th>
                      <th> Value </th> 
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Income </td> 
                      <td> {this.state.totalIncome} </td> 
                    </tr>
                    <tr>
                      <td> Salary </td> 
                      <td> {this.state.totalExpense} </td> 
                    </tr>
                    <tr>
                      <td> Profit </td> 
                      <td> {this.state.totalProfit} </td> 
                    </tr>
                    <tr>
                      <td> Power Level </td> 
                      <td> {this.state.totalPowerLevel} </td> 
                    </tr>
                    <tr>
                      <td> Effective Income </td> 
                      <td> {this.state.totalFunds} </td> 
                    </tr>
                    <tr>
                      <td> Next Financial Period </td> 
                      <td> {this.state.secondsTilUpdate} </td> 
                    </tr>
                    <tr>
                      <td> Next Competitive Event </td> 
                      <td> {this.state.secondsTilTourney} </td> 
                    </tr>
                  </tbody>
                </Table>
                <form
                  onSubmit = {(e) => {
                    e.preventDefault();
                    if (this.state.rollCost <= this.state.totalFunds) {
                      this.setState({
                        totalFunds: this.state.totalFunds - this.state.rollCost,
                      })
                      this.roll();
                    } else {
                      alert('Not enough money to scout players!');
                    }
                  }}
                  >
                    <RollButton rollCost={this.state.rollCost}> Scout a Player </RollButton>
                </form>
              </Col> 
              <Col sm={8} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {cards}
              </Col>
            </Row>
          </Container> 
        </main>
      </React.Fragment>
    );
  }

  // The roll function, calculates first the rarity of the unit to get and then picks from that rarity pool randomly
  // If we want to change how expensive rolls become as time goes on we would do that here
  roll = () => {
    let rollChance = Math.random() * 100;
    let rollRate = 2;
    for (let i = 0; i < this.state.rates.length; i++) {
      if (this.state.rates[i] <= rollChance) {
        rollRate = rollRate + 1;
      }
    }
    let pool = waifus.waifus.filter(waifu => waifu.rarity === rollRate);
    let unit = pool[Math.floor(Math.random() * pool.length)];
    let temp = this.state.currentWaifus;
    temp.push(unit);
    this.setState({
      totalPowerLevel: this.state.totalPowerLevel + unit.power,
      totalExpense: this.state.totalExpense + unit.salary,
      totalIncome: this.state.totalIncome + unit.income,
      totalProfit: this.state.totalProfit + (unit.income - unit.salary),
      currentWaifus: temp,
      rollCost: this.state.rollCost + 10
    });
  }

  // Starts the timer and continues to update it
  startTimer = () => {
    if (this.timer === 0 && this.state.secondsTilUpdate > 0) {
      this.timer = setInterval(this.countDown, 1000);
    } else {
      this.setState({secondsTilUpdate: 30});
    }
  }

  // Increments the timer down every second. This is where the end check is made so anything to be done
  // when the timer reaches 0 should be done here. Tournament and game over condition have been added.
  countDown = () => {
    let seconds = this.state.secondsTilUpdate - 1;
    let secondsTourney = this.state.secondsTilTourney - 1;
    this.setState({
      secondsTilUpdate: seconds,
      secondsTilTourney: secondsTourney
    });

    if (seconds === -1) {
      this.startTimer();
      this.setState({totalFunds: this.state.totalFunds + this.state.totalProfit});
    }
    if (this.state.secondsTilTourney === -1) {
      let events = this.state.events;
      let event = events[Math.floor(Math.random() * events.length)];
      alert("It's time for a tournament! Your team will be attending " + event + 
            "! Do you have what it takes? It'll cost " + this.state.entryCost + " and you'll need at least " + this.state.requiredPower + " power.");
      if (this.state.totalFunds < 0) {
        if (this.state.firstTimeDebt) {
          alert("You're in debt but a kind investor gave you a one time bonus. You have to miss this tournament, so make sure you manage your funds! Don't mess it up!");
          this.setState({
            totalFunds: this.state.totalFunds + 150,
            firstTimeDebt: false,
            secondsTilTourney: 60,
            entryCost: this.state.entryCost + 50,
          });
        } else {
          alert("You didn't have enough money to enter the tournament since you're already in debt and all of your fans are disappointed. Your career in esports is over!");
          alert("You failed to make it big in esports... But if you refresh the page, you can try again!");
          return;
        }
      } else {     
        if (this.state.totalFunds < this.state.entryCost) {
          alert("You didn't have enough to enter, but you managed to go into debt to enter! Let's hope it pays off...");
        }
        let earning = 0;
        if (this.state.totalPowerLevel >= this.state.requiredPower) {
          alert("You won the event! The prize was " + this.state.entryCost * 2 + "!");
          earning = this.state.entryCost * 2;
        } else {
          alert("Your team wasn't strong enough to win... Try to scout new talent to strengthen your squad!");
          earning = this.state.entryCost * -1;
        }
        this.setState({
          totalFunds: this.state.totalFunds + earning,
          entryCost: this.state.entryCost + 50,
          secondsTilTourney: 60,
          requiredPower: this.state.requiredPower + 100
        });
      }
    }
  }
}

export class HeaderNav extends React.Component {
  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand><b> Esports Tycoon </b> | An Esports Gacha Game</Navbar.Brand>
      </Navbar>
    );
  }
}

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

export default App;
