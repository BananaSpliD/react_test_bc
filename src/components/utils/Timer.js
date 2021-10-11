import {Component} from "react"
//Componente que muestra la cuenta atrás
class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { time: {}, seconds: props.time};
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
    //Función que parsea de segundos a horas, minutos y segundos
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      this.startTimer();
    }
    startTimer() {
      if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds <= 0) { 
        if(this.props.resetTimer){
          this.setState({time: this.secondsToTime(this.props.time), seconds: this.props.time });
        }else{
          this.setState({time: this.secondsToTime(0), seconds: this.props.time });
          clearInterval(this.timer);

        }
        
        this.props.timerFinished();
      }
    }
    componentWillUnmount(){
      clearInterval(this.timer);
    }
    render() {
      return(
        
        <div>{(this.state.time.m>0?this.state.time.m+":":"")+(this.state.time.m>0&&this.state.time.s<10?'0'+this.state.time.s:this.state.time.s)}
        </div>
      );
    }
  }
  export default Timer