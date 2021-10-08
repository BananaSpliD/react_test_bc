import {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import "./ClassesPage.css"
import ClassesList from './ClassesList'
// Componente que contiene la página del listado de las clases
class ClassesPage extends Component{
    constructor(props){
        super(props);
        this.state={lessonsChecked:[]};
        this.lessonsChecked=this.lessonsChecked.bind(this);
    }
    //Añade al array de lessonsChecked una clase
    //@param lessonID= ID de la clase a introducir
    lessonsChecked(lessonID){
        if(this.state.lessonsChecked.length===0){
            this.setState({lessonsChecked:[lessonID]});
            
        }else{
            const lessonIndex= this.state.lessonsChecked.indexOf(lessonID);
            let lessons=this.state.lessonsChecked;
            if(lessonIndex=== -1){
                lessons.push(lessonID);
            }else{
                lessons.splice(lessonIndex, 1) 
            }
            
            this.setState({lessonsChecked:lessons});
        }
    }

    render(){
        const {lessons,instructors}= this.props;
        return (
            <Container>
                <Row>
                    <Col className="text-end">
                        <Button disabled={this.state.lessonsChecked.length===0?true:false} variant="secondary" onClick={()=>this.props.playerStart(this.state.lessonsChecked)}>
                                <span > REPRODUCIR AUTOMÁTICAMENTE</span>
                        </Button>
                    </Col>                    
                </Row>
                <Row>
                    <ClassesList lessonsChecked={this.lessonsChecked} lessons={lessons} instructors={instructors}/>
                </Row>
            </Container>
        );
    }
}
export default ClassesPage