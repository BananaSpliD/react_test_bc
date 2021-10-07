import {Component} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import './UserProfileLessonsListComponent.css'
import {transformMillisecondsToDate} from '../../Helpers'
//Componente que contiene el listado de las clases
class UserProfileLessonsListComponent extends Component{

    render(){
        const {id,lesson,instructor}= this.props;
        let parsedDate=transformMillisecondsToDate(lesson.published);

        return (<Container key={id}>
               <Row >

                   <Col sm>
                        <img alt="bestcycling" height="30" src="https://www.cicloindoor.com/themes/bestcycling.es/images/logo-big-black.png"/>
                    </Col>
                    <Col sm className="text-end lessonsDate">
                        {parsedDate}
                    </Col>
               </Row>
                <Row className="justify-content-md-center">
                    <Container  className="lessonsCards">
                        <Row>
                            <span className="lessonCardsRowLesson">{lesson.name}</span>
                        </Row>
                        <Row >
                            <span className="lessonCardsRowInstructor">{instructor.name}</span>
                        </Row>
                    </Container>
                </Row>

        </Container>);
    }
}
export default UserProfileLessonsListComponent