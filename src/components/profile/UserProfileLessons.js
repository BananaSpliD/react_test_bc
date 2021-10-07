import {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import UserProfileLessonsList from './UserProfileLessonsList';
import {Link} from 'react-router-dom'

//Componente que engloba la parte de listar las lecciones
class UserProfileLessons extends Component{
    render(){
        const {lessons,instructors}=this.props;
        return (
            <Container>
                <Row>
                    <Col>
                        <h3> ÚLTIMAS CLASES</h3>
                    </Col>
                    <Col  className="text-end">
                    <Link to="lessons-list">
                      <Button variant="warning">VER TODAS</Button>
                      </Link>
                    </Col>
                </Row>
                <Row>
                    
                    <UserProfileLessonsList lessons={lessons} instructors={instructors}/>
                    
                </Row>
            </Container>
        );
    }
}
export default UserProfileLessons