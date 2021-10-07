import {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Navbar.css';
import {Link} from 'react-router-dom'

//Componente de navbar
class Navigationbar extends Component{
    
    render(){
        const {main}=this.props;
        return(
            //Si es la página inicial cambia el color 
            <Navbar style={{backgroundColor: main===true?"#212529":"#151515"}}>
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