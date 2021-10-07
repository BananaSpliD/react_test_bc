import {Component} from 'react'
import ClassesListComponent from './ClassesListComponent';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Componente encargado de englobar el listado de las clases

class ClassesList extends Component{
    //Dado una id de instructor, busca en el array el instructor con dicho ID
    //@param instructors= array de instructores
    //@param instructorID= ID del instructor
    //TODO: Función duplicada, se puede extraer?
    findInstructor(instructors, instructorID) {
        for (let index = 0; index < instructors.length; index++) {
            if(instructorID===instructors[index].id){
                return instructors[index];
            }            
        }
        return null;
    }
    render(){
        const {lessons,instructors}= this.props;
        console.log(lessons);
        let rows=[];
        //Iteramos el número de clases que queremos, cogiendo las últimas clases y lo añadimos al array de rows.
        //TODO:Se puede extraer con hooks?
        for(let i=0; i<lessons.length;i++){
            
            let lesson= lessons[lessons.length-1-i];
            let instructor= this.findInstructor(instructors,lesson.instructor_id);
            rows.push(
                <Col key={lesson.id} sm={4} style={{ marginTop: '1rem' }}>
                    <ClassesListComponent  lesson={lesson} instructor={instructor}/>
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