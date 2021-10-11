import { Component } from "react";
import {Stack,Button} from "react-bootstrap"
import {postSuscription} from '../../Helpers'
import './suscriptionpage.css'
class SuscriptionPage extends Component{
    constructor(props){
        super(props);
        this.state={checkboxValue:props.renovate?true:false}

    }
       /**
        * Función encargada de hacer la llamada a la api para guardar la suscripción en la api
        * @param time = tiempo en segundos que va a durar la suscripción
        */
    save = (time) => {
       postSuscription(1,time,this.state.checkboxValue).then(data=>{
           if(data.mensaje){
               alert(data.mensaje);
           }else{
               this.props.suscriptionRenovated(data.time,data.timeInit,data.renovate);
               alert("Se ha suscrito correctamente");
           }
       });        
    }
    /**
     * Función encargada de cambiarle el valor al checkbox y guardarlo en el estado
     * @param {} event 
     */
    handleInputChange=(event)=> {
        const target = event.target;
        const value =target.checked;
    
        this.setState({
            checkboxValue: value
        });        
      }
    render(){

        return(        
            <Stack className="d-flex justify-content-center"gap={3}>
                <span className="text-center suscriptionTitle">SUSCRÍBETE</span>
                <div className="text-center suscriptionCheckbox">                   
                    <input type="checkbox" checked={this.state.checkboxValue} name="checkboxValue" onChange={this.handleInputChange} /> Autorenovar automáticamente
                </div>
                <Stack direction="horizontal" gap={3} className="justify-content-md-center">
                    <Button variant="outline-warning" onClick={()=>{this.save(10)}}>1 minuto</Button>
                    <Button variant="outline-warning" onClick={()=>{this.save(300)}}>5 minutos</Button>
                    <Button variant="outline-warning" onClick={()=>{this.save(600)}}>10 minutos</Button>

                </Stack>
            </Stack>
        );
    }
}
export default SuscriptionPage