import { Component } from "react";
import UserProfileHeader from "./UserProfileHeader"
import UserProfileMiddle from "./UserProfileMiddle"
import UserProfileLessons from "./UserProfileLessons"
import UserProfileBottom from "./UserProfileBottom"
import Container from 'react-bootstrap/Container';

import "./UserProfile.css"
//Componente que engloba la página de inicio
class UserProfile extends Component{
    render(){
        const user=this.props.user;
        const lessons=this.props.lessons;
        const instructors= this.props.instructors;
        return (
            <Container>
                <UserProfileHeader user={user}/>
                <hr/>
                <UserProfileMiddle user={user}/>
                <hr/>
                <UserProfileBottom user={user}/>
                <hr/>
                <UserProfileLessons lessons={lessons} instructors={instructors}/>
            </Container>
        )
    }
}
export default UserProfile