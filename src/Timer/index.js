import React, { Component } from 'react';
import './index.css';

class Timer extends Component {
  componentWillMount() {
    this.initialiseValues();
  }


  initialiseValues = () => {

    this.setState({
      buttonLogic: {
        showButton: false
      },
      startInput: {
        startValue: '',
        startFlag: false,
        inputStartHour: 0,
        inputStartMinute: 0,
      },
      endInput: {
        endValue: '',
        endFlag: false,
        inputEndHour: 0,
        inputEndMinute: 0,
      },
      startButton: {
        startLabel: 'Start',
        startButtonFlag: true,
        showStartButtonFlag: true
      },
      pauseButton: {
        pauseLabel: 'Pause',
        pauseButtonFlag: false
      },
      resumeButton: {
        resumeLabel: 'Resume',
        resumeButtonFlag: false
      },
      stopButton: {
        stopLabel: 'Stop',
        stopButtonFlag: true
      },
      currentTimer: {
        currentValue: '',
        currentTimerFlag: false,
        currentHour: 0,
        currentMinute: 0,
        currentSecond: 0
      },
      backGroundTimer: {
        backGroundValue: '',
        backGroundTimerFlag: false,
        backGroundHour: 0,
        backGroundMinute: 0,
        backGroundSecond: 0
      }
    })
  }


  //Function to accept input value from user
  handleChange = (e) => {
    const { startInput, endInput } = this.state

    //to store targetName from input field
    let inputHTMLname = e.target.name

    //local variables to store inputName , hour , minute, flag values
    let x, hh, mm, flag

    //depending on the start or end input
    if (inputHTMLname === 'startValue') {
      x = startInput
      hh = 'inputStartHour'
      mm = 'inputStartMinute'
      flag = 'startFlag'
    }
    else if (inputHTMLname === 'endValue') {
      x = endInput
      hh = 'inputEndHour'
      mm = 'inputEndMinute'
      flag = 'endFlag'
    }

    //storing targetValue from the input
    let inputHTMLvalue = e.target.value

    //depending on the values it will correctly assign the values
    //will store object value for specified input
    x[inputHTMLname] = inputHTMLvalue;

    //extract hour from inputValue
    x[hh] = parseInt(inputHTMLvalue.substr(0, 2))

    //extract minute from inputValue
    x[mm] = parseInt(inputHTMLvalue.substr(3, 2))

    //will assign flag value true
    x[flag] = true

    this.setState({
      startInput,
      endInput,
    });
  }

  validateButtonHandler = () => {
    let { startInput, endInput, startButton } = this.state
    const { startFlag } = startInput
    const { endFlag } = endInput

    if (startFlag && endFlag) {
      startButton = {
        ...startButton,
        startButtonFlag: false
      }
    }

    this.setState({
      startButton
    })
  }

  startTimerHandler = (e) => {

    this.initialAssignTimer();
    this.currentTimeRunner();
  }

  //to store the initial start time to currenttimer value
  initialAssignTimer = () => {
    let { startInput, currentTimer, backGroundTimer, startButton, pauseButton, stopButton } = this.state

    let { startButtonFlag } = startButton
    const { inputStartHour, inputStartMinute } = startInput
    let { currentHour, currentMinute, currentTimerFlag } = currentTimer;
    let { backGroundHour, backGroundMinute, backGroundTimerFlag } = backGroundTimer

    currentHour = inputStartHour
    currentMinute = inputStartMinute
    currentTimerFlag = true

    backGroundHour = inputStartHour
    backGroundMinute = inputStartMinute
    backGroundTimerFlag = true

    //used spread operator so we have to assign it to a object or variable
    currentTimer = {
      ...currentTimer,
      currentHour, currentMinute, currentTimerFlag
    }

    backGroundTimer = {
      ...backGroundTimer,
      backGroundHour, backGroundMinute, backGroundTimerFlag
    }

    startButton = {
      ...startButton,
      startButtonFlag: false,
      showStartButtonFlag: false
    }

    pauseButton = {
      ...pauseButton,
      pauseButtonFlag: true
    }

    stopButton = {
      ...stopButton,
      stopButtonFlag: false
    }

    this.setState({
      currentTimer,
      backGroundTimer,
      startButton, pauseButton, stopButton
    })
  }

  //function to run for currentTimer
  currentTimeRunner = () => {
    const { buttonLogic } = this.state
    let { showButton } = buttonLogic
    setInterval(() => {

      //will calculate the updated time
      this.incrementTimer();
    }, 1000)

    //first time use for either showing pause button or removing start
    this.setState({
      buttonLogic: {
        showButton: !showButton
      }
    })
  }

  incrementTimer = () => {
    let { currentTimer, endInput, backGroundTimer } = this.state

    const { inputEndHour, inputEndMinute } = endInput
    let { currentHour, currentMinute, currentSecond, currentTimerFlag } = currentTimer;
    let { backGroundHour, backGroundMinute, backGroundSecond, backGroundTimerFlag } = backGroundTimer

    if ((inputEndHour > backGroundHour) || ((inputEndHour === backGroundHour) && (inputEndMinute > backGroundMinute))) {
      backGroundSecond = backGroundSecond + 1;
      if (backGroundSecond > 59) {
        backGroundSecond = 0;
        backGroundMinute += 1;
      }
      if (backGroundMinute > 59) {
        backGroundMinute = 0;
        backGroundHour += 1;
      }
      if (currentTimerFlag) {
        currentSecond = backGroundSecond
        currentMinute = backGroundMinute
        currentHour = backGroundHour
      }

      this.setState({
        backGroundTimer: {
          ...backGroundTimer,
          backGroundSecond,
          backGroundMinute,
          backGroundHour,
          backGroundTimerFlag
        },
        currentTimer: {
          ...currentTimer,
          currentSecond,
          currentMinute,
          currentHour,
          currentTimerFlag
        }
      })
    }
    else {
      currentTimerFlag = false;
      currentTimer.currentHour = backGroundTimer.backGroundHour
      currentTimer.currentMinute = backGroundTimer.backGroundMinute
      currentTimer.currentSecond = backGroundTimer.backGroundSecond
      this.setState({
        currentTimer,
        buttonLogic: {
          showButton: false
        },
        startInput: {
          startValue: '',
          startFlag: false,
          inputStartHour: 0,
          inputStartMinute: 0,
        },
        endInput: {
          endValue: '',
          endFlag: false,
          inputEndHour: 0,
          inputEndMinute: 0,
        },
        startButton: {
          startLabel: 'Start',
          startButtonFlag: true,
          showStartButtonFlag: true
        },
        resumeButton: {
          resumeLabel: 'Resume',
          resumeButtonFlag: false
        },
        stopButton: {
          stopLabel: 'Stop',
          stopButtonFlag: true
        }
      })
    }
  }

  pauseTimerHandler = () => {
    const { currentTimer, pauseButton, resumeButton } = this.state;
    let { currentTimerFlag } = currentTimer
    currentTimerFlag = false


    this.setState({
      currentTimer: {
        ...currentTimer,
        currentTimerFlag
      },
      pauseButton: {
        ...pauseButton,
        pauseButtonFlag: false
      },
      resumeButton: {
        ...resumeButton,
        resumeButtonFlag: true
      }
    })
  }

  resumeTimerHandler = () => {
    const { currentTimer, pauseButton, resumeButton } = this.state;
    let { currentTimerFlag } = currentTimer
    currentTimerFlag = true


    this.setState({
      currentTimer: {
        ...currentTimer,
        currentTimerFlag
      },
      pauseButton: {
        ...pauseButton,
        pauseButtonFlag: true
      },
      resumeButton: {
        ...resumeButton,
        resumeButtonFlag: false
      }
    })
  }


  stopTimerHandler = () => {
    this.initialiseValues();
    window.location.reload()
  }

  render() {
    const { startInput, endInput, startButton, pauseButton, stopButton, resumeButton, currentTimer, backGroundTimer, buttonLogic, disabled } = this.state
    const { showButton } = buttonLogic
    const { startValue } = startInput
    const { endValue } = endInput
    let { startLabel, startButtonFlag, showStartButtonFlag } = startButton
    const { pauseLabel, pauseButtonFlag } = pauseButton
    const { stopLabel, stopButtonFlag } = stopButton
    const { resumeLabel, resumeButtonFlag } = resumeButton


    const { handleChange, startTimerHandler, pauseTimerHandler, resumeTimerHandler, stopTimerHandler, validateButtonHandler } = this

    let { currentValue, currentHour, currentMinute, currentSecond } = currentTimer
      
    currentValue = `${currentHour}:${currentMinute}:${currentSecond}`

    return (
      <div className="Timer" >
        <p><b>Timer :</b></p>
        <div className="input-time-display">
          Start
          <input type='time' name='startValue' value={startValue} onChange={(e) => { handleChange(e); validateButtonHandler(); }}></input><br /><br></br>
          End
          <input type='time' name='endValue' value={endValue} onChange={(e) => { handleChange(e); validateButtonHandler(); }}></input><br></br>
        </div>
        <div>
          <br/>Current {currentValue}
        </div>
        <div>

          {
            (!showButton && showStartButtonFlag) ? <input type='button' value={startLabel} onClick={startTimerHandler} disabled={startButtonFlag}></input>
              : null
          }<br/>

          {(showButton && pauseButtonFlag) && <input type='button' value={pauseLabel} onClick={pauseTimerHandler}></input>}<br/>
          {(showButton && resumeButtonFlag) && <input type='button' value={resumeLabel} onClick={resumeTimerHandler}></input>}

          <br />
          <input type='button' value={stopLabel} onClick={stopTimerHandler} disabled={stopButtonFlag}></input>
        </div>

      </div>
    );
  }
}

export default Timer;