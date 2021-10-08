import {Component} from 'react'
import {Card} from 'react-bootstrap'
import {Container,Row,Stack,Col} from 'react-bootstrap'
import './ClassesListComponent.css'
import {transformMillisecondsToDate} from '../../Helpers'
import {Link} from "react-router-dom"

//Hook para mostrar la dificultad
//@param level el nivel de dificultad
const LevelBars=(level)=>{    
    const maxLevel=3;
    let rows=[];
    for(let i=0;i<maxLevel;i++){
        //Si está por debajo del nivel de dificultad pone círculo con relleno y si no círculo sin relleno
        rows.push( (i)<level.level?
            <div key={i} className="circleFilled"></div>:
            <div key={i} className="circleNotFilled"></div>)
    }
    return(
            <Stack direction="horizontal" gap={maxLevel}>
                Nivel
                {rows}
            </Stack>
    )
}
//Hook para mostrar la duración, este se encargará también de convertir los segundos en minutos
const Duration=(seconds)=>{
    
    let mins=parseInt(seconds.seconds/60);
    return (      
        <div>
            
            {"Duración "+mins+"'"}
         </div>
        )

}

//Componente de mostrar el card de la clase
class ClassesListComponent extends Component{

    render(){

        const {lesson,instructor}= this.props;
        let parsedDate=transformMillisecondsToDate(lesson.published, {month: 'short', day: 'numeric' });
        return (
            
    

            <Card className="lessonsCard">
                <Link className="noHyperLink" to={{pathname:"lessons/"+lesson.id,state: { prevPath: "/lessons-list" }}}>
                    <Card.Img variant="top" src={lesson.image} />
                </Link>
                <Card.Title className="lessonsCardTitle">
                <Stack direction="horizontal" gap={2}>
                    <input type="checkbox"  onClick={()=>this.props.lessonsChecked(lesson.id)}/>
                    
                    <Row className="justify-content-md-center">
                            <Container>
                                <Row>
                                    <span className="lessonListCardsLesson">{lesson.name}</span>
                                </Row>
                                <Row >
                                    <span className="lessonListCardsInstructor">{instructor.name}</span>
                                </Row>
                            </Container>
                    </Row>
                </Stack>


                </Card.Title>
                {   
                    lesson.finished&&
                    <Card.Subtitle className="bottom-left completed">COMPLETADA</Card.Subtitle>
                }
                <Card.Body className="cardBodyPadding">
                        <Row>
                            <Col>
                                <LevelBars component={'span'} level={lesson.level} />
                            </Col>
                            <Col className="text-center">
                            {parsedDate}
                            </Col>
                            <Col>
                                <Duration component={'span'} seconds={lesson.duration} />
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        )

    }

}
export default ClassesListComponent 