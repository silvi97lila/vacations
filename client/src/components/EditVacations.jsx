import React, { Component } from 'react';
import NavBar from './NavBar';
import Axios from 'axios';

export class EditVacations extends Component {
    state={
        data:{},
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        },
    }
    componentDidMount(){
        let url=window.location.pathname.split("/");
        const id=url[3];
        Axios.get("http://localhost:8080/api/vacation/"+id, {
            headers:this.state.headers
        }).then(response => {this.setState({data:response.data})});
    }
    handleChange=(e)=>{
        const data={...this.state.data};
        data[e.target.name]=e.target.value;
        data['enable']=false;
        data['waiting']=true;
        this.setState({data});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:8080/api/vacation/', this.state.data, {
            headers:this.state.headers
        }).then((response)=> {
            window.location="/home";
        });
    }
    render() {
        return (
            <div className="vacation">
            <div className="container">
                <h3>Request Vacations</h3>
                <hr/>
                <div className="row">
                    <NavBar/>
                    <div className="vacation-form col-md-8">
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
                            <label >Start Date</label><br/>
                           <input onChange={this.handleChange}
                            value={this.state.data.start_date} 
                            name="start_date"
                            className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label >End Date</label><br/>
                            <input onChange={this.handleChange} 
                            value={this.state.data.end_date}
                            name="end_date" 
                            className="form-control"/>
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

export default EditVacations
