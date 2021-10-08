import {Component} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {findInstructor,findLesson} from "../../Helpers"
import "./Lesson.css"
import Timer from './Timer';
const Player=(history)=>{
    return(
        <div id="player" className="d-flex align-items-center">
            <Timer time="5" history={history} />
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