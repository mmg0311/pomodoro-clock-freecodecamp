import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.myInterval = undefined;
    this.state = {
      total: this.props.wasSession
        ? this.props.breakLength * 60
        : this.props.sessionLength * 60,
      minutes: 0,
      seconds: 0,
      wasSession: this.props.wasSession,
      isPause: this.props.isPause,
      reset: this.props.reset
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.isPause !== prevProps.isPause) {
      const sessionChanged =
        this.props.sessionLength !== prevProps.sessionLength;
      const breakChanged = this.props.breakLength !== prevProps.breakLength;
      let newTotal = this.state.total;
      if (this.props.wasSession && breakChanged) {
        newTotal = this.props.breakLength * 60;
      }
      if (!this.props.wasSession && sessionChanged) {
        newTotal = this.props.sessionLength * 60;
      }
      if (this.props.reset !== prevProps.reset) {
        newTotal = this.props.wasSession
          ? this.props.breakLength
          : this.props.sessionLength;
      }
      this.setState({
        total: newTotal,
        wasSession: this.props.wasSession,
        isPause: this.props.isPause
      });
      this.handleTick();
    }
  }
  // componentDidMount() {
  //   console.log(this.state);
  //   this.handleTick();
  // }
  handleTick() {
    if (this.props.isPause) {
      clearInterval(this.myInterval);
      this.setState({ ...this.state });
    } else {
      this.myInterval = setInterval(() => {
        const { total } = this.state;
        if (total === 0) {
          const session = this.state.wasSession;
          this.setState({
            total: !session
              ? this.props.breakLength * 60
              : this.props.sessionLength * 60,
            wasSession: !session
          });
        } else {
          this.setState({
            total: total - 1
          });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  render() {
    let { minutes, seconds, total } = this.state;
    seconds = total % 60;
    minutes = Math.floor(total / 60);
    console.log(this.state.wasSession);
    return (
      <>
        <div id="timer-label">
          {this.state.wasSession ? "Break" : "Session"}
        </div>
        <div id="time-left">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </>
    );
  }
}
