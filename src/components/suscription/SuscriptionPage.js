import { Component } from "react";
import {Stack,Button} from "react-bootstrap"
import './suscriptionpage.css'
class SuscriptionPage extends Component{
    render(){
        return(        
            <Stack className="d-flex justify-content-center"gap={3}>
                <span className="text-center suscriptionTitle">SUSCRÍBETE</span>
                <div className="text-center suscriptionCheckbox">
                    <input type="checkbox" /> Autorenovar automáticamente
                </div>
                <Stack direction="horizontal" gap={3} className="justify-content-md-center">
                    <Button variant="outline-warning">1 minuto</Button>
                    <Button variant="outline-warning">5 minutos</Button>
                    <Button variant="outline-warning">10 minutos</Button>

                </Stack>
            </Stack>
        );
    }
}
export default SuscriptionPage