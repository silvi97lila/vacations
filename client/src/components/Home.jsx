import React, { Component } from 'react';
import axios from 'axios';
import {getCredentials} from '../services/authService';
import NavBar from './NavBar';
import { FaTrashAlt,FaEdit } from 'react-icons/fa';
import {NavLink} from 'react-router-dom';

export class Home extends Component {
    state={
        data:{
            CompensationDay:[],
            DaysOff:[],
            Vacations:[]
        },
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        },
        users:getCredentials()
    }
    componentDidMount() {
        const {users, headers}=this.state;
        axios.get('http://localhost:8080/api/data/'+users.id, {
            headers:headers
        })
        .then(response => { 
            this.setState({data:response.data});
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response)
        });
    }

     handleDelete = (entity,id)=>{
        const data={
            CompensationDay:this.state.data.CompensationDay.filter(m=> m.id !== id),
            DaysOff:this.state.data.DaysOff.filter(m=> m.id !== id),
            Vacations:this.state.data.Vacations.filter(m=> m.id !== id)
        }
       axios.delete("http://localhost:8080/api/"+entity+"/"+id, {
            headers:this.state.headers
        }).then(() => {
            this.setState({data});
        });
     
    }



    render() {
        const {Vacations,DaysOff,CompensationDay}=this.state.data;
        return (
            <div className="home">
                <div className="container">
                <h3 >Show Enable Proposals List</h3>
                <hr/>
                <div className="row">
                <NavBar />
                    <div className="enable-proposals col-md-8">
                        <h3>Compensation Day</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Compensation Day</th>
                                    <th scope="col"  style={{textAlign:"center"}}>Edit / Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CompensationDay.map((value, index) =>
                                        <tr key={index} className={value.enable? "true":"" || value.disable? "false":"" || value.waiting? "waiting":""}>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.title}</td>
                                        <td>{value.compensation_day}</td>
                                        <td className="edit-del">
                                        <NavLink to={`/home/edit-compensationday/${value.id}`}><FaEdit className="edit"/></NavLink>
                                        <FaTrashAlt className="delete" onClick={()=> this.handleDelete("compensationday",value.id)} />
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                        </table>
                        <h3>Days Off</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Day Offs</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" style={{textAlign:"center"}}>Edit / Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DaysOff.map((value, index) =>
                                        <tr key={index} className={value.enable? "true":"" || value.disable? "false":"" || value.waiting? "waiting":""}>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.title}</td>
                                        <td>{value.dayOff}</td>
                                        <td>{value.description}</td>
                                        <td className="edit-del">
                                        <NavLink to={`/home/edit-daysoff/${value.id}`}><FaEdit className="edit"/></NavLink>
                                        <FaTrashAlt className="delete" onClick={()=> this.handleDelete("daysoff",value.id)} />
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                        </table>
                        <h3>Vacations</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col"  style={{textAlign:"center"}}>Edit / Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Vacations.map((value, index) =>
                                        <tr key={index} className={value.enable? "true":"" || value.disable? "false":"" || value.waiting? "waiting":""}>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.title}</td>
                                        <td>{value.start_date}</td>
                                        <td>{value.end_date}</td>
                                        <td className="edit-del">
                                        <NavLink to={`/home/edit-vacations/${value.id}`} disable="true"><FaEdit className="edit"/></NavLink>
                                        <FaTrashAlt className="delete" onClick={()=> this.handleDelete("vacation",value.id)} />
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home
