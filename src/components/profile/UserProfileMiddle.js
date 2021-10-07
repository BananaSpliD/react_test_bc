import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserProfileMiddle.css';
//Creación de un hook para reutilizar la muestra de la información para NIVEL, PERSEVERANCIA y PUNTOS
const UserInfo=({points,description}) =>{
    return (                   
    <Stack gap={2}  className="userMiddleInfo">
        <span>{points}</span>
        <span>{description}</span>                   
    </Stack>
    )     
}

//Contiene la parte de en medio de la página del perfil de usuario, que engloba las puntuaciones de nivel, constancia y puntos
class UserProfileMiddle extends Component{

    render(){
        const {level,perseverance,total_points} = this.props;

        return (
        <Container >
            <Row className="justify-content-md-center">
                <Col >
                    <UserInfo points={level} description="NIVEL"/>                    
                </Col>
                <Col > 
                    <UserInfo points={perseverance} description="CONSTANCIA"/>                                            
                </Col>
                <Col >
                    <UserInfo points={total_points} description="PUNTOS"/>
                </Col>
            </Row>
        </Container>
        )
    }
}
export default UserProfileMiddle