import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './UserProfileHeader.css';
//Contiene la parte de arriba de la página del perfil de usuario
class UserProfileHeader extends Component{
    render(){
        const {avatar,name} = this.props;

        return (
        <Container >
            <Row >
                <Col sm={2} >
                <Image src={avatar} alt={name} roundedCircle />
                </Col>
                <Col sm={10}>
                    <h3 className="nombre">{name} </h3>
                    <h4 className="ubicacion"> Valencia </h4>
                </Col>
                
            </Row>
        </Container>
        )
    }
}
export default UserProfileHeader