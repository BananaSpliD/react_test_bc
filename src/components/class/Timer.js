import {Component} from "react"
//
class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { time: {}, seconds: props.time ,history:props.history};
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
      if (seconds === 0) { 
        this.props.history.lessonFinished(this.props.history.idLesson);
        
        if(this.props.history.lessonsChecked.length>0){
          this.props.history.removeLesson(this.props.history.lessonsChecked[0]);
        }
        
        if(this.props.history.lessonsChecked.length===0){
          this.props.history.history.push(this.state.history.prevPath);

        }else{
          this.setState({time: this.secondsToTime(5), seconds: 5 });
          this.props.history.history.push("/lessons/"+this.props.history.lessonsChecked[0]);
        }
      }
    }
    componentWillUnmount(){
      clearInterval(this.timer);
    }
    render() {
      return(
        
        <div>{this.state.time.s}
        </div>
      );
    }
  }
  export default Timer