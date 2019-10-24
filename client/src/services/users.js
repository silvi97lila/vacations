import jwtDecode from 'jwt-decode';

export function getUser(){
    try{
        const token=localStorage.getItem('token');
        const user=jwtDecode(token);
        return user.fullName;
    }catch{
        console.log("Error");
    }
}