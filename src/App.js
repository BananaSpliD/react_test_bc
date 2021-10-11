import { Component } from 'react';
import UserProfile from './components/profile/UserProfile'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Switch} from 'react-router-dom'
import ClassesPage from './components/classes-list/ClassesPage';
import Lesson from './components/class/Lesson';
import { findLessonIndex, apiCallGet, calculateTimeLeft,deleteSuscription } from './Helpers';
import SuscriptionPage from './components/suscription/SuscriptionPage';
class App extends Component{

  constructor(props){
    super(props);
    
    this.state={loaded:false,lessonsChecked:[],history:props.history,time:0,loaded2:false};
    this.lessonFinished=this.lessonFinished.bind(this);
    this.removeLesson=this.removeLesson.bind(this);
    this.playerStart=this.playerStart.bind(this);
    this.suscriptionRenovated=this.suscriptionRenovated.bind(this);
    this.deleteSuscription=this.deleteSuscription.bind(this);
    this.setSuscriptionTime=this.setSuscriptionTime.bind(this);
  }
  componentDidMount(){
    this.initData();
  }
  //Llamada a la API para cargar los datos
  initData= ()=>{
    apiCallGet('https://bestcycling-public.s3.eu-west-1.amazonaws.com/api-test/db.json').then(data => {
      this.setState({data});    
      this.setState({loaded:true});      
  
    });
    //La api no devuelve un id de usuario
    const userID=1;
    apiCallGet('http://127.0.0.1:3001/suscriptions/'+userID).then(data => {   
      let time = calculateTimeLeft(data.time,data.timeInit);
      let renovate=data.renovate?data.renovate:false;
      time=time?time:0;
      this.setState({time});
      this.setState({renovate});
      this.setState({loaded2:true});      

    });
  }
  /**Comienza la reproducción automática
   * @param lessonsCheckedArray= Array que contiene la id de las clases que se tienen que reproducir
  */
  playerStart=(lessonsCheckedArray)=>{
    this.setState({lessonsChecked:lessonsCheckedArray});
    this.state.history.push("/lessons/"+lessonsCheckedArray[0]);
  }
  /**Añade el estado de la clase a finalizado
   * @param lessonID=ID de la clase
  */
  lessonFinished=(lessonID)=>{
    const lessonIndex=findLessonIndex(lessonID,this.state.data.training_classes);
    let lessons=this.state.data.training_classes;
    lessons[lessonIndex]= {...lessons[lessonIndex],finished:true};
    this.setState({training_classes:lessons});

  }
  deleteSuscription=(idSuscription)=>{
    deleteSuscription(idSuscription);
    this.setState({time:0});
    this.setState({renovate:false});      
    

  }
  setSuscriptionTime=(time)=>{
    this.setState({time:time});
  }
  /**Busca y elimina del array de lessons la clase que ha sido seleccionada
   * @param lessonID= ID de la clase
   */
  removeLesson=(lessonID)=>{

    const lessonIndex= this.state.lessonsChecked.indexOf(lessonID);
    let lessons=this.state.lessonsChecked;
    this.state.lessonsChecked.splice(lessonIndex, 1);
    this.setState({lessonsChecked:lessons});

  }
  
  suscriptionRenovated=(timeRenovation,timeInit,renovated)=>{
    let time = calculateTimeLeft(timeRenovation,timeInit);
    let renovate=renovated;
    time=time?time:0;
    this.setState({time});
    this.setState({renovate});
  }

  render(){    
    const renovate=this.state.renovate;
    if(this.state.loaded===false||this.state.loaded2===false){
      return null;
    }    
    return (
      <div>
        

            <Switch>
              

              <Layout renovate={this.state.renovate} time={this.state.time} setSuscriptionTime={this.setSuscriptionTime} suscriptionRenovated={this.suscriptionRenovated} deleteSuscription={this.deleteSuscription}>
                <Route path="/suscriptions/:idUser" render={(props) =>

                   <SuscriptionPage {...props} renovate={renovate} suscriptionRenovated={this.suscriptionRenovated} />}></Route>
                <Route path="/lessons/:idLesson" render={(props) => <Lesson {...props} lessonsChecked={this.state.lessonsChecked} lessonFinished={this.lessonFinished} lessons={this.state.data.training_classes}  instructors={this.state.data.instructors} removeLesson={this.removeLesson}/>}>
                </Route>
                <Route path="/lessons-list">


                  <ClassesPage playerStart={this.playerStart} lessonsCheckedArray={this.state.lessonsChecked} lessons={this.state.data.training_classes}  instructors={this.state.data.instructors} />
                      
          
                </Route>
                <Route exact path="/">

                  <UserProfile lessons={this.state.data.training_classes}  instructors={this.state.data.instructors} user={this.state.data.profile} />          

          
                </Route>
              </Layout>

            </Switch>

      </div>
    );
  }
}

export default App;
