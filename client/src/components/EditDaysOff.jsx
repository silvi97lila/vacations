import React, { Component } from 'react';
import Axios from 'axios';
import NavBar from './NavBar';


export class EditDaysOff extends Component {
    state={
        data:{},
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        },
    }
    componentDidMount(){
        let url=window.location.pathname.split("/");
        const id=url[3];
        Axios.get("http://localhost:8080/api/daysoff/"+id, {
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
        Axios.post('http://localhost:8080/api/daysoff/', this.state.data, {
            headers:this.state.headers
        }).then((response)=> {
            window.location="/home";
        });
    }

    render() {
        return (
            <div className="daysoff">
            <div className="container">
                <h3 className="page-title">Request Days Off</h3>
                <hr/>
                <div className="row">
                    <NavBar/>
                    <div className="daysoff-form col-md-8">
                    <h3 className="page-title"><b>Edit Days Off</b></h3>
                    <hr/>
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
                                <input type="text" 
                                className="form-control"
                                name="dayOff"
                                value={this.state.data.dayOff}
                                onChange={this.handleChange}
                                placeholder="Enter Start Date" />  
                            </div>
                            <div className="form-group">
                                <label >Description</label><br/>
                                <textarea type="text" 
                                className="form-control"
                                name="description"
                                value={this.state.data.description}
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

export default EditDaysOff
