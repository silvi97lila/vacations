import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function login(username, password){
    return axios.post('http://localhost:8080/api/users/login', {username, password});
}

export function getCredentials(){
    try {
        const token=localStorage.getItem('token');
        const users = jwtDecode(token);
        return users;
      } catch (error) {
        console.log("Error "+error);
    }
}