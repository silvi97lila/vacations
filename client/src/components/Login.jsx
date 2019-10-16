import React, { Component } from 'react';
import {login} from '../services/authService';
import jwtDecode from 'jwt-decode';

export class Login extends Component {

    state={
        account:{
            username:'',
            password:'',
        },
        errors:''
    } 

    handleChange = e =>{
        const account={...this.state.account};
        account[e.currentTarget.name]=e.currentTarget.value;
        this.setState({
            account
        });
    }

    handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const {username, password}=this.state.account;
            const {data}=await login(username,password);
            const jwt=data.token.split(" ");
            localStorage.setItem('token',jwt[1]);//Set the token in local storage
            const user =jwtDecode(jwt[1]);
            if(user.role === 'admin'){
               window.location="/admin";
            }else if (user.role ==='user'){
                window.location="/home";
            }
        } catch (errors) {
            this.setState({errors: "Invald Username And Password"});
       
        }
    }
    
    render() {
        let {errors} =this.state;
        if(errors !== ''){
            errors= <div className="alert alert-danger" > {errors}</div>
        }
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">   
                <h3>Login as Admin or User</h3>       
                {errors}          
                    <div className="form-group">
                        <label >Email address</label>
                        <input value={this.state.username} type="email"
                         className="form-control" 
                         onChange={this.handleChange}
                         name="username"/>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" 
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    }
}

export default Login
