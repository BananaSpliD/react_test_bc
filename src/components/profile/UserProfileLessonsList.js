import {Component} from 'react'
import UserProfileLessonsListComponent from './UserProfileLessonsListComponent';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Componente que contiene el listado de las clases
class UserProfileLessonsList extends Component{
    //Dado una id de instructor, busca en el array el instructor con dicho ID
    //@param instructors= 
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
        const numLessons=9;
        let rows=[];
        //Iteramos el número de clases que queremos, cogiendo las últimas clases y lo añadimos al array de rows.
        for(let i=0; i<numLessons;i++){
            if(lessons.length-1-i<0){
                break;
            }
            let lesson= lessons[lessons.length-1-i];
            let instructor= this.findInstructor(instructors,lesson.instructor_id);
            rows.push(
                <Col sm={4}>
                    <UserProfileLessonsListComponent id={i} lesson={lesson} instructor={instructor}/>
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
export default UserProfileLessonsList