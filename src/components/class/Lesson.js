import {Component} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap';
import { Link,useParams } from "react-router-dom";

class Lesson extends Component{
    render(){
        const prevPath=this.props.prevPath?this.props.prevPath:"/";
        console.log(this.props)
        return(
        <Container >
        <Row >
            <Col sm={2} >
                <Link to={prevPath}>
                    <Button>
                        {"<-"}
                    </Button>
                </Link>
            </Col>
            <Col sm={10}>

            </Col>
            
        </Row>
    </Container>)
    }
}
export default Lesson