import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserProfileMiddle.css';
//Contiene la parte de en medio de la página del perfil de usuario, que engloba las puntuaciones de nivel, constancia y puntos
class UserProfileMiddle extends Component{
    render(){
        const {user} = this.props;

        return (
        <Container >
            <Row className="justify-content-md-center">
                <Col >
                    <Stack gap={2}  className="userMiddleInfo">
                        <span>{user.level}</span>
                        <span>NIVEL</span>                   
                    </Stack>
                </Col>
                <Col > 
                    <Stack gap={2} className="userMiddleInfo">
                        <span>{user.perseverance}</span>
                        <span>CONSTANCIA</span>                   
                    </Stack>
                </Col>
                <Col >
                    <Stack gap={2}  className="userMiddleInfo">
                        <span>{user.total_points}</span>
                        <span>PUNTOS</span>                   
                    </Stack>          
                </Col>
            </Row>
        </Container>
        )
    }
}
export default UserProfileMiddle