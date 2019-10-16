import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './NavBar';

export class Register extends Component {
    state = {
        user:{
            fullName:'',
            username:'',
            password:'',
            role:''
        }
    }

    handleChange = (e) =>{
        const user={...this.state.user};
        user[e.currentTarget.name]=e.currentTarget.value;
        this.setState({
            user
        });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/register', this.state.user)
        .then(response => {
            this.setState({
                fullName:'',
                username:'',
                password:'',
                role:''
            })
        });
    }

    render() {
        return (
            <div className="register-section">
                <Navbar/>
                <div className="container">
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <h3>Register new User</h3>
                    <div className="form-group">
                        <label >Full Name</label>
                        <input type="text"
                         className="form-control"
                         name="fullName"
                         value={this.state.fullName}
                         onChange={this.handleChange}
                         placeholder="Full Name" />
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email"
                         className="form-control"
                         value={this.state.username}
                         name="username"
                         onChange={this.handleChange}
                         placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                        className="form-control"  
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange}
                        placeholder="Password" />
                    </div>
                    <label>User Roles</label>
                    <select className="form-control" name="role" onChange={this.handleChange} value={this.state.role}>
                        <option value="">Select User Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
                </div>
            </div>
        )
    }
}

export default Register
