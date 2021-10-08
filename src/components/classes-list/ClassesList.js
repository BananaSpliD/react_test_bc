import {Component} from 'react'
import ClassesListComponent from './ClassesListComponent';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { findInstructor } from '../../Helpers';
//Componente encargado de englobar el listado de las clases

class ClassesList extends Component{
    render(){
        
        const {lessons,instructors}= this.props;
        let rows=[];
        //Iteramos el número de clases que queremos, cogiendo las últimas clases y lo añadimos al array de rows.
        //TODO:Se puede extraer con hooks?
        for(let i=0; i<lessons.length;i++){
            
            let lesson= lessons[lessons.length-1-i];
            let instructor= findInstructor(instructors,lesson.instructor_id);
            rows.push(
                <Col key={lesson.id} sm={4} style={{ marginTop: '1rem' }}>
                    <ClassesListComponent  lessonsChecked={this.props.lessonsChecked} lesson={lesson} instructor={instructor}/>
                </Col>
            );
        }
        return (<Container>     
                    <Row>
                        {rows}
                    </Row>
                </Container>);
    }

}
export default ClassesList