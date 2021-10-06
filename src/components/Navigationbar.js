import {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Navbar.css';
//Componente de navbar
class Navigationbar extends Component{
    render(){
        return(
            <Navbar bg="dark">
                <Container>
                    <img alt="bestcycling" height="60" src="https://www.cicloindoor.com/themes/bestcycling.es/images/logo-big-black.png"/>
                </Container>
                
            </Navbar>
        );
    }
}

export default Navigationbar;