import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Login from './components/Login';
import Admin from './components/admin/Admin';
import Home from './components/Home';
import Logout from './components/Logout';
import Register from './components/admin/Register';
import Daysoff from './components/admin/Daysoff';
import CompensationDay from './components/admin/CompensationDay';
import AddVacations from './components/AddVacations';
import AddDaysOff from './components/AddDaysOff';
import AddCompensationDay from './components/AddCompensationDay';
import EditVacations from './components/EditVacations';
import EditDaysOff from './components/EditDaysOff';
import EditCompensationDay from './components/EditCompensationDay';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


export class App extends Component {

  constructor(){
    super();
    try {
      const token=localStorage.getItem('token');
      const users = jwtDecode(token);
      this.state.users=users;
      if (jwtDecode(token).exp < Date.now() / 1000) {
        window.location="/logout";
      }
    } catch (error) {
      console.log("Error "+error);
    }
  }
  state={
    users:{}
  };

render(){
  const {users}=this.state.users;
  //Protected Router
  const AdminRoute=({path, component:Component})=>{
      return(
        <Route 
          path={path}
          render={()=>{
            if(this.state.users.role !== "admin") return <Redirect to="/"/>;
            return <Component/>;
          }}
        />
      );
  }

  const UserRoute=({path, component:Component})=>{
    return(
      <Route 
        path={path}
        render={()=>{
          if(this.state.users.role !== "user") return <Redirect to="/"/>;
          return <Component/>;
        }}
      />
    );
}
    return (
        <div className="App-header">
          {users}
          <div className="App">
          <Router>
              <Switch>
                <Route exact path="/"><Login/></Route>
                <Route exact path="/admin" render={() =>{ 
                    if(this.state.users.role !== "admin") return <Redirect to="/"/>;
                    return <Admin users={this.state.users}/>
                }}/>
                <UserRoute exact path="/home" component={Home} />
                <UserRoute exact path="/home/add-vacations" component={AddVacations} />
                <UserRoute exact path="/home/add-daysoff" component={AddDaysOff} />
                <UserRoute exact path="/home/add-compensationday" component={AddCompensationDay} />
                <UserRoute exact path="/home/edit-vacations/:id" component={EditVacations} />
                <UserRoute exact path="/home/edit-daysoff/:id" component={EditDaysOff} />
                <UserRoute exact path="/home/edit-compensationday/:id" component={EditCompensationDay} />
                <AdminRoute exact path="/admin/register" component={Register} />  
                <AdminRoute exact path="/admin/days-off" component={Daysoff} />   
                <AdminRoute exact path="/admin/compensation-day" component={CompensationDay} />   
                <Route exact path="/logout" component={Logout} />               
              </Switch>
            </Router>
          </div>
        </div>
      );
    }

}

export default App;
