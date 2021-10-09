import {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Navigationbar from './Navigationbar';
import "./Layout.css"
//Componente Layout que englobará toda la interfaz de la aplicación
class Layout extends Component{
    render(){
        const main= window.location.pathname==="/";
        return (
            <div>
        <Navigationbar main={main} time={this.props.time}/>

        <div id="layout" className={main===true?"layoutBgBlack":"layoutBgGrey"}>
            <Container>
                {this.props.children}
            </Container>
        </div>
        </div>
        )
    }
}
export default Layout