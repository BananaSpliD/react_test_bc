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
        const {lessons,instructors,lessonsCheckedArray}= this.props;
        console.log(lessonsCheckedArray,"aa")
        return (
            <Container>
                <Row>
                    <Col className="text-end">
                        <Button disabled={lessonsCheckedArray.length===0?true:false} variant="secondary">

                                <span > REPRODUCIR AUTOMÁTICAMENTE</span>
                        </Button>
                    </Col>                    
                </Row>
                <Row>
                    <ClassesList lessonsChecked={this.props.lessonsChecked} lessons={lessons} instructors={instructors}/>
                </Row>
            </Container>
        );
    }
}
export default ClassesPage