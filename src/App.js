import { Component } from 'react';
import UserProfile from './components/profile/UserProfile'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Switch} from 'react-router-dom'
import ClassesPage from './components/classes-list/ClassesPage';
import Lesson from './components/class/Lesson';
class App extends Component{
  componentDidMount(){
    this.initData();
  }
  //Llamada a la API para cargar los datos
  initData= ()=>{
    fetch('https://bestcycling-public.s3.eu-west-1.amazonaws.com/api-test/db.json')
    .then(response => response.json())
    .then(data => {
      this.setState({data});      
      console.log(this.state,"aqui");
      this.setState({loaded:true});
      
      
      
    });
  }
  state={loaded:false};
  render(){    
    
    if(this.state.loaded===false){
      return null;
    }    
    return (
      <div>
        
        <Layout>

            <Switch>
              <Route path="/lessons/:idLesson" render={(props) => <Lesson {...props} lessons={this.state.data.training_classes}  instructors={this.state.data.instructors}/>}>
              </Route>
              <Route path="/lessons-list">


                <ClassesPage lessons={this.state.data.training_classes}  instructors={this.state.data.instructors} />
                    
        
              </Route>
              <Route path="/">

                <UserProfile lessons={this.state.data.training_classes}  instructors={this.state.data.instructors} user={this.state.data.profile} />          

        
              </Route>
            </Switch>
            </Layout>

      </div>
    );
  }
}

export default App;
