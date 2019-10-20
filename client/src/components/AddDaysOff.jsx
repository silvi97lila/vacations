import React, { Component } from 'react';
import NavBar from './NavBar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';

export class AddDaysOff extends Component {
    state={
        title:'',
        dayOff:new Date(),
        description:'',
        waiting:1,
        success:''
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChange1=(e)=>{
        const dayOff=e;
        this.setState({dayOff});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const data={...this.state}
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        Axios.post('http://localhost:8080/api/daysoff/', data, {
            headers:headers
        }).then((response)=> {
            this.setState({
                title:'',
                dayOff:new Date(),
                description:'',
                success: "The data is inserted sucessfully."
            })
        });
    }
    render() {
        const {success}=this.state;
        let message= "";
        if(success !== "") {
            message = <div className="alert alert-success">{success}</div>;
        }
        return (
            <div className="daysoff">
                <div className="container">
                    <h3>Days Off</h3>
                    <hr/>
                    <div className="row">
                        <NavBar/>
                        <div className="daysoff-form col-md-8">
                        <h3><b>Request Days Off</b></h3><hr/>
                            {message}
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" 
                                    className="form-control"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    placeholder="Enter Title" />
                                </div>
                                <div className="form-group">
                                    <label >Start Date</label><br/>
                                <DatePicker onChange={this.handleChange1}
                                    selected={this.state.dayOff} 
                                    name="startDate"
                                    className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label >Description</label><br/>
                                    <textarea type="text" 
                                    className="form-control"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    >Enter Description</textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDaysOff
