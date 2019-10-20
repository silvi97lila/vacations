import React, { Component } from 'react';
import NavBar from './NavBar';
import Axios from 'axios';


export class AddCompensationDay extends Component {
    state={
        title:'',
        compensation_day: 0,
        waiting:1,
        monthDays:[ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    }
    handleChange=(e)=>{
        const title=e.target.value;
        this.setState({title});
    }
    handleChange1=(e)=>{
        const compensation_day=e.target.value;
        this.setState({compensation_day});
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const data={...this.state}
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        Axios.post('http://localhost:8080/api/compensationday/', data, {
            headers:headers
        }).then((response)=> {
            console.log(response);
            this.setState({
                title:'',
                compensation_day:0
            })
        });
    }
    render() {
        return (
            <div className="compensationDay">
                <div className="container">
                    <h3>Request Compensation Day</h3>
                    <hr/>
                    <div className="row">
                        <NavBar/>
                        <div className="compensation-form col-md-8">
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
                                    <label >Compensation Day</label><br/>
                                    <select value={this.state.compensation_day} onChange={this.handleChange1} className="form-control">
                                        {this.state.monthDays.map((value, index) =>
                                               <option value={value} key={index}>{value}</option>
                                            )}
                                    </select>
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

export default AddCompensationDay
