import {Component} from 'react'
import {Navbar,Button,Container,Col,Row} from 'react-bootstrap';
import './Navbar.css';
import {Link} from 'react-router-dom'
import Timer from './utils/Timer';
import { renovateSuscription } from '../Helpers';
//Componente de navbar
const Suscription=(props)=>{
    const timerFinished=()=>{
        if(props.props.renovate){
            renovateSuscription(1).then(data=>{
                props.props.suscriptionRenovated(data.time,data.timeInit,data.renovate)                
            })

        }else{
            props.props.deleteSuscription(1);
        }
        
        
    }
    return(
        <div>
            
            {props.time<=0?
                
                <Link to="/suscriptions/1">
                    
                    <Button variant="warning">
                    {
                        props.props.renovate?"RENOVACIÓN PENDIENTE":"SUSCRÍBETE"
                    }
                    </Button>
                </Link>:
                <span>
                    <Timer time={ props.time} timerFinished={timerFinished} resetTimer={false}/>
                </span>
            }    
        </div>

    )
}
class Navigationbar extends Component{
    render(){
        const {main}=this.props;
        return(
            //Si es la página inicial cambia el color 
            <Navbar style={{backgroundColor: main===true?"#212529":"#151515"}}>
                <Container >
                    <Row className="align-items-center">
                        <Col>
                            <Link to="/">
                                <img alt="bestcycling" height="60" src="https://www.cicloindoor.com/themes/bestcycling.es/images/logo-big-black.png"/>
                            </Link>
                        </Col>
                        <Col className="text-end">
                                <Suscription  props={this.props} time={this.props.time}/>
                        </Col>

                    </Row>

                </Container>
                
            </Navbar>
        );
    }
}

export default Navigationbar;