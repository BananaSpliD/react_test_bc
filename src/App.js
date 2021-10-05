import { Component } from 'react';
import UserProfile from './components/UserProfile'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  constructor(props){
    super(props);
    this.initData();
  }
  //Llamada a la API para cargar los datos
  initData= ()=>{
    fetch('https://bestcycling-public.s3.eu-west-1.amazonaws.com/api-test/db.json')
    .then(response => response.json())
    .then(data => {this.setState(data); this.setState({loaded:true});console.log(data);});
  }
  state={loaded:false}
  render(){    
    
    if(this.state.loaded===false){
      return null;
    }
    return (
      
      <UserProfile user={this.state.profile} />
    );
  }
}

export default App;
