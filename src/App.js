import React from "react";
import "./styles.css";
import Timer from "./timer";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      label: "Session",
      timeLeft: 25,
      isPause: false,
      wasSession: false,
      reset: false
    };
  }

  handleReset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      label: "Session",
      timeLeft: 25,
      isPause: true,
      wasSession: false,
      reset: true
    });
  };

  handlePlay = () => {
    this.setState({
      ...this.state,
      isPause: false
    });
  };
  handlePause = () => {
    this.setState({
      ...this.state,
      isPause: true
    });
  };

  handleIncreBreak = () => {
    const bl = this.state.breakLength;
    if (this.state.isPause) {
      this.setState({
        ...this.state,
        breakLength: bl + (bl !== 60 ? 1 : 0)
      });
    }
  };
  handleDecreBreak = () => {
    const bl = this.state.breakLength;
    if (this.state.isPause) {
      this.setState({
        ...this.state,
        breakLength: bl - (bl !== 1 ? 1 : 0)
      });
    }
  };
  handleIncreSession = () => {
    const sl = this.state.sessionLength;
    if (this.state.isPause) {
      this.setState({
        ...this.state,
        sessionLength: sl + (sl !== 60 ? 1 : 0)
      });
    }
  };
  handleDecreSession = () => {
    const sl = this.state.sessionLength;
    if (this.state.isPause) {
      this.setState({
        ...this.state,
        sessionLength: sl - (sl !== 1 ? 1 : 0)
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="box left">
            <div id="break-label">BREAK LENGTH</div>
            <div className="container">
              <span
                id="break-decrement"
                className="sym"
                onClick={this.handleDecreBreak}
              >
                -
              </span>
              <span id="break-length" className="content">
                {this.state.breakLength}
              </span>
              <span
                id="break-increment"
                className="sym"
                onClick={this.handleIncreBreak}
              >
                +
              </span>
            </div>
          </div>
          <div className="box right">
            <div id="session-label">SESSION LENGTH</div>
            <div className="container">
              <span
                id="session-decrement"
                className="sym"
                onClick={this.handleDecreSession}
              >
                -
              </span>
              <span id="session-length" className="content">
                {this.state.sessionLength}
              </span>
              <span
                id="session-increment"
                className="sym"
                onClick={this.handleIncreSession}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className="time">
          <Timer
            wasSession={this.state.wasSession}
            sessionLength={this.state.sessionLength}
            breakLength={this.state.breakLength}
            isPause={this.state.isPause}
            reset={this.state.reset}
          />
        </div>
        <div className="container" id="start_stop">
          <button onClick={this.handlePlay}>paly</button>
          <button onClick={this.handlePause}>pause</button>
          <button onClick={this.handleReset} id="reset">
            reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
