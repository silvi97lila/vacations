import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

export class CompensationDay extends Component {

    state={
        compensationDay:[],
        users:{},
        err:''
    }
    componentDidMount() {
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        axios.get('http://localhost:8080/api/compensationday/', {
            headers:headers
        })
        .then(response => { 
            this.setState({compensationDay:response.data});
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
        const vac=this.state.compensationDay.filter(function (params) {
            if(params.id !== parseInt(id)) return params;
            return null;
        })
        const headers={
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
        //Get data from database
        axios.post('http://localhost:8080/api/compensationday/enable',data,{
            headers:headers
        })
        .then(response => { 
            console.log(vac);
            this.setState({compensationDay:vac});
        })
        .catch(error => {
            console.log(error.response)
        });
    }  
      
    render() {
        const compensationDay=this.state.compensationDay;
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
                                <th scope="col">Compensation Day</th>
                                <th scope="col">Enable</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {compensationDay.filter(value => value.enable === false ).map((value, index) =>
                                    <tr key={index}>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.user_id.fullName}</td>
                                        <td>{value.title}</td>
                                        <td>{value.compensation_day}</td>
                                        <td>
                                            <button className="btn btn-danger"
                                             value={value.id}
                                             onClick={this.handleEnable}>
                                                 Enable
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

export default CompensationDay
