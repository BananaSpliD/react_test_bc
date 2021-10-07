import {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import "./ClassesPage.css"
import ClassesList from './ClassesList'
// Componente que contiene la página del listado de las clases
class ClassesPage extends Component{

    render(){
        const {lessons,instructors}= this.props;
        return (
            <Container>
                <Row>
                    <Col className="text-end">
                        <Button variant="secondary">
                            <img alt="play" src="play.png"/>
                            <span> REPRODUCIR AUTOMÁTICAMENTE</span>
                        </Button>
                    </Col>                    
                </Row>
                <Row>
                    <ClassesList lessons={lessons} instructors={instructors}/>
                </Row>
            </Container>
        );
    }
}
export default ClassesPage