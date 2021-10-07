import {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Navbar.css';
import {Link} from 'react-router-dom'

//Componente de navbar
class Navigationbar extends Component{
    render(){
        return(
            <Navbar bg="dark">
                <Container>
                    <Link to="/">
                        <img alt="bestcycling" height="60" src="https://www.cicloindoor.com/themes/bestcycling.es/images/logo-big-black.png"/>
                    </Link>
                </Container>
                
            </Navbar>
        );
    }
}

export default Navigationbar;