import { Component } from "react";
import Stack from 'react-bootstrap/Stack';
import './UserProfilePointsCircle.css';
//Contiene la forma de los círculos que engloban las puntuaciones
class UserProfilePointsCircle extends Component{
    render(){
        const {description,color,data} = this.props;
        const style={
            backgroundColor:color,
            width:"90px",
            verticalAlign: "middle",
            lineHeight: "90px",
            height:"90px",
            textAlign:"center",
            borderRadius: "100%"
        };
        return (

        <Stack gap={2}  className="userBottomInfoPoints">
            <div style={style}>{data}</div>
            <span>{description}</span>                   
        </Stack>
        )
    }
}
export default UserProfilePointsCircle