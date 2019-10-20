import React, { Component } from 'react';
import Axios from 'axios';
import NavBar from './NavBar';
export class EditCompensationDay extends Component {
    state={
        data:{},
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        },
        monthDays:[ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    }
    componentDidMount(){
        let url=window.location.pathname.split("/");
        const id=url[3];
        Axios.get("http://localhost:8080/api/compensationday/"+id, {
            headers:this.state.headers
        }).then(response => {this.setState({data:response.data})});
    }

    handleChange=(e)=>{
        const data={...this.state.data};
        data[e.target.name]=e.target.value;
        data['enable']=false;
        data['waiting']=true;
        data['disable']=false;
        this.setState({data});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:8080/api/compensationday/', this.state.data, {
            headers:this.state.headers
        }).then((response)=> {
            window.location="/home";
        });
    }
    render() {
        return (
        <div className="compensationDay">
                <div className="container">
                    <h3>Edit Compensation Day</h3>
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
                                    value={this.state.data.title}
                                    onChange={this.handleChange}
                                    placeholder="Enter Title" />
                                </div>
                                <div className="form-group">
                                    <label >Compensation Day</label><br/>
                                    <select value={this.state.data.compensation_day} onChange={this.handleChange} name="compensation_day"
                                     className="form-control">
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

export default EditCompensationDay
