import { Component } from "react";
import {Stack,Button} from "react-bootstrap"
import {postSuscription} from '../../Helpers'
import './suscriptionpage.css'
class SuscriptionPage extends Component{
    constructor(props){
        super(props);
        this.state={checkboxValue:props.renovate?true:false}

    }
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
    handleInputChange=(event)=> {
        const target = event.target;
        const value =target.checked;
    
        this.setState({
            checkboxValue: value
        });
        console.log(value)
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