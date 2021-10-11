import {Component} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {findInstructor,findLesson} from "../../Helpers"
import "./Lesson.css"
import Timer from '../utils/Timer';
//Componente para devolver el reproductor 
//@param history= devuelve el objeto history que contiene la propiedad history y los datos que se le pasan por parámetro
const Player=(history)=>{
    /** 
        Función que se llama cuando finaliza la cuenta atrás del reproductor y
        este lo que hace es que llama a la función del padre para marcar como que la clase ha finalizado
        borrarlo del array de clases que se tienen que reproducir y reproducir la siguiente clase o volver atrás
    */
    const timerFinished=()=>{
        history.lessonFinished(history.idLesson);
        
        if(history.lessonsChecked.length>0){
            history.removeLesson(history.lessonsChecked[0]);
        }
        
        if(history.lessonsChecked.length===0){
          history.history.push(history.prevPath);

        }else{
          history.history.push("/lessons/"+history.lessonsChecked[0]);
        }
    }
    return(
        <div id="player" className="d-flex align-items-center">
            <Timer time="5" timerFinished={timerFinished} resetTimer={true} />
        </div>
    );

}
//Componente de mostrar la información de la clase individual
class Lesson extends Component{

    render(){
        const {lessons,instructors}=this.props;
        const prevPath=this.props.location.state&&this.props.location.state.prevPath?this.props.location.state.prevPath:"/";

        const lesson=findLesson(this.props.match.params.idLesson,lessons);
        const instructor=findInstructor(instructors,lesson.instructor_id);
        return(
        <Container >
        <Row >
            <Col sm={1} className="align-items-center d-flex " >
                <Link to={prevPath}>
                    <Button variant="secondary" >
                        {"<"}
                    </Button>
                </Link>
            </Col>
            <Col sm={11}>
                <Row >
                    <h5 className="classInfoName">{lesson.name}</h5>
                </Row>
                <Row>
                    <h6 className="classInfoNameInstructor">{instructor.name}</h6>
                </Row>
            </Col>
            
        </Row>
        <Row style={{marginTop:"15px"}}>
            <Player lessonsChecked={this.props.lessonsChecked} removeLesson={this.props.removeLesson} lessonFinished={this.props.lessonFinished} lesson={lesson} history={this.props.history} idLesson={  this.props.match.params.idLesson   } prevPath={prevPath}/>
        </Row>
    </Container>)
    }
}
export default Lesson