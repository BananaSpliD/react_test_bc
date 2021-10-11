import { Component } from 'react';
import UserProfile from './components/profile/UserProfile'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Switch,Redirect} from 'react-router-dom'
import ClassesPage from './components/classes-list/ClassesPage';
import Lesson from './components/class/Lesson';
import { findLessonIndex, apiCallGet, calculateTimeLeft,deleteSuscription, renovateSuscription} from './Helpers';
import SuscriptionPage from './components/suscription/SuscriptionPage';
/**
 * Componente que sirve para comprobar si está suscrito o no para acceder al vídeo
 * @param time = tiempo de suscripción
 * @param renovate = si tiene autorenovación
 * @param suscriptionRenovated= función para renovar la suscripción
 * @param lessonsChecked= cola de clases que se tienen que reproducir en orden
 * @returns devuelve la url de la página a la que se va a redirigir
 */
const PrivateRoute = ({ time,renovate,suscriptionRenovated,lessonsChecked, ...rest}) =>{
  if(time<=0 && renovate){
    renovateSuscription(1).then(data=>{
        suscriptionRenovated(data.time,data.timeInit,data.renovate)                
    })
  }
  return ( <Route exact
    {...rest}
    
      render={(props) =>  
        time>0
        ? <Lesson {...props} lessonsChecked={lessonsChecked} lessonFinished={rest.lessonFinished} lessons={rest.lessons}  instructors={rest.instructors} removeLesson={rest.removeLesson}/>
        : <Redirect to='/suscriptions/1'/>}
    />
  )
}
class App extends Component{

  constructor(props){
    super(props);
    
    this.state={loaded:false,lessonsChecked:[],history:props.history,time:0,loaded2:false,suscriptionIsValid:true};
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
    this.setState({playerReproducing:false});
    if(this.state.time<0){
      this.setState({suscriptionIsValid:false})
    }
  }
  /**
   * Hace una llamada a la api para borrar la suscripción
   * @param idSuscription = id del usuario que se va a eliminar la suscripción
   */
  deleteSuscription=(idSuscription)=>{
    deleteSuscription(idSuscription);
    this.setState({time:0});
    this.setState({renovate:false});      

  }
  /**
   * Cambia el estado del tiempo de la suscripción
   * @param time = tiempo en segundos
   */
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
  /**
   * Función encargada de calcular el tiempo que queda de suscripción y ponerla de estado
   * @param {} timeRenovation = tiempo que renueva la suscripción ( en segundos)
   * @param {*} timeInit = fecha de comienzo en que se renueva la suscripción
   * @param {*} renovated = si tiene el autorenovado
   */
  suscriptionRenovated=(timeRenovation,timeInit,renovated)=>{
    let time = calculateTimeLeft(timeRenovation,timeInit);
    let renovate=renovated;
    time=time?time:0;
    this.setState({time});
    this.setState({renovate});
    this.setState({suscriptionIsValid:true})
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
              <PrivateRoute time={this.state.time}  suscriptionRenovated={this.suscriptionRenovated} renovate={this.state.renovate} path='/lessons/:idLesson' lessonsChecked={this.state.lessonsChecked} lessonFinished={this.lessonFinished} lessons={this.state.data.training_classes}  instructors={this.state.data.instructors} removeLesson={this.removeLesson} />

                <Route path="/suscriptions/:idUser" render={(props) =>

                   <SuscriptionPage {...props} renovate={renovate} suscriptionRenovated={this.suscriptionRenovated} />}></Route>

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
