import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';


export class Daysoff extends Component {

    state={
        daysoff:[],
        users:{},
        err:''
    }
    componentDidMount() {
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        axios.get('http://localhost:8080/api/daysoff/', {
            headers:headers
        })
        .then(response => { 
            this.setState({daysoff:response.data});
        })
        .catch(error => {
            console.log(error.response)
        });

    }

    handleEnable=(event)=>{
        const data={
            id: event.target.value
        }
        const {id}=data;
        const vac=this.state.daysoff.filter(function (params) {
            if(params.id !== parseInt(id)) return params;
            return null;
        })
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        //Get data from database
        axios.post('http://localhost:8080/api/daysoff/enable',data,{
            headers:headers
        })
        .then(response => { 
            console.log(vac);
            this.setState({daysoff:vac});
        })
        .catch(error => {
            console.log(error.response)
        });
    }  
    handleDisable=(event)=>{
        const data={
            id: event.target.value
        }
        const {id}=data;
        const vac=this.state.daysoff.filter(function (params) {
            if(params.id !== parseInt(id)) return params;
            return null;
        })
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        //Get data from database
        axios.post('http://localhost:8080/api/daysoff/disable',data,{
            headers:headers
        })
        .then(response => { 
            console.log(vac);
            this.setState({daysoff:vac});
        })
        .catch(error => {
            console.log(error.response)
        });
    }
      
    render() {
        const daysoff=this.state.daysoff;
        return (
            <div className="admin_panel">
                <NavBar user={this.props.users}/>
                <div className="container">
                    <h3 className="mt-3">Daysoff  Requests</h3>
                    <hr style={{backgroundColor: "#fff"}}/>
                    <table className="table mt-2" >
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">User</th>
                                <th scope="col">Title</th>
                                <th scope="col">Day Off</th>
                                <th scope="col">Description</th>  
                                <th scope="col">Enable</th> 
                                <th scope="col">Disable</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {daysoff.filter(value => value.enable === false ).map((value, index) =>
                                    <tr key={index}>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.user_id.fullName}</td>
                                        <td>{value.title}</td>
                                        <td>{value.dayOff}</td>
                                        <td>{value.description}</td>
                                        <td>
                                            <button className="btn btn-success"
                                             value={value.id}
                                             onClick={this.handleEnable}>
                                                 Enable
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                             value={value.id}
                                             onClick={this.handleDisable}>
                                                 Disable
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default Daysoff
