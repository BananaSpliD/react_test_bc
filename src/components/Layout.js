import {Component} from 'react'
import Container from 'react-bootstrap/Container';

import "./Layout.css"
//Componente Layout que englobará toda la interfaz de la aplicación
class Layout extends Component{
    render(){
        return (
        <div id="layout">
            <Container>
                {this.props.children}
            </Container>
        </div>)
    }
}
export default Layout