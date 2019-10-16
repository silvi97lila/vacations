import React, { Component } from 'react';
import Axios from 'axios';
import NavBar from './NavBar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



export class AddVacations extends Component {
    state={
            start_date: new Date(),
            end_date:'',
            title:'',
            success:''
    }

    handleChange=(e)=>{
        const title=e.currentTarget.value;
        this.setState({title});

    }
    handleChange1=(e)=>{
        const start_date=e;
        this.setState({start_date});
    }
    handleChange2=(e)=>{
        const end_date=e;
        this.setState({end_date});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const data={...this.state}
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        Axios.post('http://localhost:8080/api/vacation/', data, {
            headers:headers
        }).then((response)=> {
            this.setState({
                title:'',
                start_date:new Date(),
                end_date:'',
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
            <div className="vacation">
                <div className="container">
                    <h3>Request Vacations</h3>
                    <hr/>
                    <div className="row">
                        <NavBar/>
                        <div className="vacation-form col-md-8">
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
                                selected={this.state.start_date} 
                                name="startDate"/>
                            </div>
                            <div className="form-group">
                                <label >End Date</label><br/>
                                <DatePicker onChange={this.handleChange2} 
                                selected={this.state.end_date}
                                name="endDate" />
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

export default AddVacations
