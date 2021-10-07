import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserProfilePointsCircle from "./UserProfilePointsCircle";
import './UserProfileMiddle.css';
//Contiene la parte de abajo de la página del perfil de usuario con los círculos de los puntos de resistencia, fuerza, flexibilidad y mente
class UserProfileBottom extends Component{
    render(){
        const {stamina_points,strength_points,flexiblity_points,mind_points} = this.props;

        return (
        <Container  className="d-flex justify-content-center">
            <Row className="justify-content-md-center" >
                <Col >
                    <UserProfilePointsCircle description="Resistencia" data={stamina_points} color="yellow"/>

                </Col>
                <Col >
                    <UserProfilePointsCircle description="Fuerza" data={strength_points} color="#ff4646"/>
                </Col>
                <Col > 
                    <UserProfilePointsCircle description="Flexibilidad" data={flexiblity_points} color="#00ff00"/>
                </Col>
                <Col >
                   <UserProfilePointsCircle description="Mente" data={mind_points} color="#0dcaf0"/>
  
                </Col>
            </Row>
        </Container>
        )
    }
}
export default UserProfileBottom