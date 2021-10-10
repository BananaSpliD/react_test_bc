import { Component } from 'react';
import UserProfile from './components/profile/UserProfile'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Switch} from 'react-router-dom'
import ClassesPage from './components/classes-list/ClassesPage';
import Lesson from './components/class/Lesson';
import { findLessonIndex, apiCallGet } from './Helpers';
import SuscriptionPage from './components/suscription/SuscriptionPage';
class App extends Component{

  constructor(props){
    super(props);
    
    this.state={loaded:false,lessonsChecked:[],history:props.history,time:0};
    this.lessonFinished=this.lessonFinished.bind(this);
    this.removeLesson=this.removeLesson.bind(this);
    this.playerStart=this.playerStart.bind(this);

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
      /**Cogemos la fecha de inicio, menos la fecha actual para saber el tiempo que ha pasado desde la suscripción
       * y luego se lo restamos por el tiempo de la suscripción que ha contratado
       * 
      */
      var time = data.time-parseInt((new Date().getTime()-new Date(data.timeInit).getTime()) / 1000);
      time=time?time:0;
      this.setState({time});
    });
  }
  //Comienza la reproducción automática
  //@param lessonsCheckedArray= Array que contiene la id de las clases que se tienen que reproducir
  playerStart(lessonsCheckedArray){
    this.setState({lessonsChecked:lessonsCheckedArray});
    this.state.history.push("/lessons/"+lessonsCheckedArray[0]);
  }
  //Añade el estado de la clase a finalizado
  //@param lessonID=ID de la clase
  lessonFinished(lessonID){
    const lessonIndex=findLessonIndex(lessonID,this.state.data.training_classes);
    let lessons=this.state.data.training_classes;
    lessons[lessonIndex]= {...lessons[lessonIndex],finished:true};
    this.setState({training_classes:lessons});

  }

  //Busca y elimina del array de lessons la clase que ha sido seleccionada
  removeLesson(lessonID){

    const lessonIndex= this.state.lessonsChecked.indexOf(lessonID);
    let lessons=this.state.lessonsChecked;
    this.state.lessonsChecked.splice(lessonIndex, 1);
    this.setState({lessonsChecked:lessons});

  }
  render(){    
    if(this.state.loaded===false){
      return null;
    }    
    return (
      <div>
        

            <Switch>
              

              <Layout time={this.state.time}>
                <Route path="/suscriptions/:idUser" render={(props) => <SuscriptionPage {...props} />}></Route>
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
