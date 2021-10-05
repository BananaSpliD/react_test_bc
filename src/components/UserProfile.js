import { Component } from "react";
import UserProfileHeader from "./UserProfileHeader"
import UserProfileMiddle from "./UserProfileMiddle"
import UserProfileBottom from "./UserProfileBottom"

import "./UserProfile.css"
//Componente que engloba la página de inicio
class UserProfile extends Component{
    render(){
        const user=this.props.user;
        console.log(user);
        return (
            <div>
                <UserProfileHeader user={user}/>
                <hr/>
                <UserProfileMiddle user={user}/>
                <hr/>
                <UserProfileBottom user={user}/>
                <hr/>
            </div>
        )
    }
}
export default UserProfile