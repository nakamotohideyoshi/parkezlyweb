import React, { Component, PropTypes } from "react";
import moment from "moment";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft : this.props.timeLeft,
      hrs: 0,
      mins: 0,
      secs: 0
    };
    this.setRemainingTime = this.setRemainingTime.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.setRemainingTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setRemainingTime() {
    const { timeLeft } = this.state;
    let secs = Math.floor((timeLeft / 1000) % 60);
    let mins = Math.floor((timeLeft / 1000 / 60) % 60);
    let hrs = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

    console.log(secs);

    this.setState({
      timeLeft: timeLeft - 1000,
      hrs: hrs,
      mins: mins,
      secs: secs
    });
    console.log(this.state);
    if(timeLeft == 0) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { timeLeft, hrs, mins, secs } = this.state;

    return (
      <div className='timer'>
        {hrs} : {mins} : {secs}
      </div>
    );
  }
}

Timer.propTypes = {
  timeLeft: PropTypes.number
};

export default Timer;