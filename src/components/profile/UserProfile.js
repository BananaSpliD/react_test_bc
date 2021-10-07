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
        const {user,lessons,instructors}=this.props;
        return (
            <Container>
                <UserProfileHeader name={user.name} avatar={user.avatar}/>
                <hr/>
                <UserProfileMiddle level={user.level} perseverance={user.perseverance} total_points={user.total_points}/>
                <hr/>
                <UserProfileBottom stamina_points={user.stamina_points} strength_points={user.strength_points} flexiblity_points={user.flexiblity_points} mind_points ={user.mind_points}/>

                <hr/>
                <UserProfileLessons lessons={lessons} instructors={instructors}/>
            </Container>
        )
    }
}
export default UserProfile