import { Component } from 'react';
import UserProfile from './components/profile/UserProfile'
import Layout from './components/Layout'
import Navigationbar from './components/Navigationbar'
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
      <div>
        <Navigationbar/>
        <Layout>
          <UserProfile user={this.state.profile} />
        </Layout>
      </div>
    );
  }
}

export default App;
