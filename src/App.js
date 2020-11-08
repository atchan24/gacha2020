import React from 'react';
import './App.css';
import waifus from './waifus.json';

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
      totalFunds: 100,
      rates: [0, 70, 95],
      secondsTilUpdate: 30,
    };
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
    for (let i = 0; i < temp.length; i++) {
      waifus.push(<p>Name: {temp[i].name} | Power Level: {temp[i].power} | Income: {temp[i].income} | Salary: {temp[i].salary}</p>)
    }

    return (
      <div className="App">
          <p>
            ESports Tycoon
          </p>
          <div>
            <ul>
              <li>Current Income: {this.state.totalIncome}</li>
              <li>Current Salary: {this.state.totalExpense}</li>
              <li>Current Profit: {this.state.totalProfit}</li>
              <li>Current Power Level: {this.state.totalPowerLevel}</li>
              <li>Current Funds: {this.state.totalFunds}</li>
            </ul>
            <p>Payment in: {this.state.secondsTilUpdate}s</p>
          </div>
        <form
          onSubmit = {(e) => {
            e.preventDefault();
            if (this.state.rollCost <= this.state.totalFunds) {
              this.setState({
                totalFunds: this.state.totalFunds - this.state.rollCost,
              })
              this.roll();
            } else {
              console.log('not enough money to roll');
            }
          }}
          >
            <button>Roll</button>
        </form>
        {waifus}
      </div>
    );
  }

  // The roll function, calculates first the rarity of the unit to get and then picks from that rarity pool randomly
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
      currentWaifus: temp
    });
    console.log(this.state.currentWaifus);
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
  // when the timer reaches 0 should be done here
  countDown = () => {
    let seconds = this.state.secondsTilUpdate - 1;
    this.setState({secondsTilUpdate: seconds});

    if (seconds === -1) {
      this.startTimer();
      this.setState({totalFunds: this.state.totalFunds + this.state.totalProfit});
    }
  }
}

export default App;
