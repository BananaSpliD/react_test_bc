import {Component} from 'react'
import {Navbar,Button,Container,Col,Row} from 'react-bootstrap';
import './Navbar.css';
import {Link} from 'react-router-dom'
import Timer from './utils/Timer';
//Componente de navbar
const Suscription=(props)=>{
    return(
        <Button variant="warning">
        {
            props.props.time===0?"SUSCRÍBETE":<Timer time={props.props.time}/>
        }
        </Button>
    )
}
class Navigationbar extends Component{
    
    render(){
        const {main}=this.props;
        return(
            //Si es la página inicial cambia el color 
            <Navbar style={{backgroundColor: main===true?"#212529":"#151515"}}>
                <Container >
                    <Row >
                        <Col>
                            <Link to="/">
                                <img alt="bestcycling" height="60" src="https://www.cicloindoor.com/themes/bestcycling.es/images/logo-big-black.png"/>
                            </Link>
                        </Col>
                        <Col className="text-end">
                                <Suscription props={this.props}/>
                        </Col>

                    </Row>

                </Container>
                
            </Navbar>
        );
    }
}

export default Navigationbar;