import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
      values: [0,0,0]
  }

  numberFormatter = (num) => { //checks for turn of denomination against its 100s place to decide whether a decimal should be provided and which abbreviation to use
    const toFixedWithoutRounding = numToFix => numToFix.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]; //returns matched number up to second decimal place without round

  	if(num < 1000) {
  		return num;
  	}

    if(num < 10000 && num !== 1000) {
      return toFixedWithoutRounding(num/1000) + "K";
    }

  	if(num < 1000000) {
  		return Math.round(num/1000) + "K";
  	}

  	if(num < 10000000 && num !== 1000000) {
  		return toFixedWithoutRounding(num/1000000) + "M";
  	}

  	if(num < 1000000000) {
  		return Math.round((num/1000000)) + "M";
  	}

    if(num < 10000000000 && num !== 1000000000) {
      return toFixedWithoutRounding(num/1000000000) + "B";
    }

  	if(num < 1000000000000) {
  		return Math.round((num/1000000000)) + "B";
  	}

  	return "1T+"; // default past 1 trillion
  }

  validateNumericalInput = (value) => { // checks that the input is a number and returns alert if invalid input
    if (!value.match(/^[0-9]+$/) && value !== "") {
       alert("Must input numbers");
       return false;
    }

    return true;
  }

  updateNumber = (e, index) => { //onchange listener for inputs, updates state array with corresponding input index
    const value = e.target.value;

    if(this.validateNumericalInput(value)) {
      const values = this.state.values;
      values[index] = value * 1; //forces numerical value by multiplying by 1
      this.setState({values});
    }
  }

  render() {
    return (
      <div className="App">
        <div className="gridbox">
          <span>Num1</span>
          <input onChange={(e) => this.updateNumber(e, 0)} type="text" value={this.state.values[0]} />
        </div>
        <div className="gridbox">
          <span>Num2</span>
          <input onChange={(e) => this.updateNumber(e, 1)} type="text" value={this.state.values[1]} />
        </div>
        <div className="gridbox">
          <span>Num3</span>
          <input onChange={(e) => this.updateNumber(e, 2)} type="text" value={this.state.values[2]} />
        </div>
        <div className="gridbox">
          <span>Sum</span>
          {this.numberFormatter(this.state.values[0] + this.state.values[1] + this.state.values[2])}
        </div>
      </div>
    );
  }
}

export default App;
