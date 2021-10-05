import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserProfilePointsCircle from "./UserProfilePointsCircle";
import './UserProfileMiddle.css';
//Contiene la parte de abajo de la página del perfil de usuario con los círculos de los puntos de resistencia, fuerza, flexibilidad y mente
class UserProfileBottom extends Component{
    render(){
        const {user} = this.props;
        const style={
            width:"500px"
        }
        return (
        <Container  className="justify-content-md-center">
            <Row className="justify-content-md-center" style={style} >
                <Col >
                    <UserProfilePointsCircle description="Resistencia" data={user.stamina_points} color="yellow"/>

                </Col>
                <Col >
                    <UserProfilePointsCircle description="Fuerza" data={user.strength_points} color="#ff4646"/>
                </Col>
                <Col > 
                    <UserProfilePointsCircle description="Flexibilidad" data={user.flexiblity_points} color="#00ff00"/>
                </Col>
                <Col >
                   <UserProfilePointsCircle description="Mente" data={user.mind_points} color="#0dcaf0"/>
  
                </Col>
            </Row>
        </Container>
        )
    }
}
export default UserProfileBottom