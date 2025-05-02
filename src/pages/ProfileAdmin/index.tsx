import { useEffect, useState } from "react";

import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';

export function ProfileAdmin(){

    const [admin, setAdmin] = useState([]);

    const isLoggedIn = !!localStorage.getItem("token"); // verificar se esta logado
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProfile();
    },[]);

    async function fetchProfile() {
        try{
          const response = await fetch("http://localhost:8000/api/auth/adminProfiles", {
            headers: {
              "Authorization": `Bearer ${token}`,
            }
          });
  
          if(response.ok){
            const data = await response.json();
            setAdmin(data);
          }
          else{
            console.error("Erro")
          }
        } catch (error) {
          console.error(error)
        }
      }

    return(
        <div>
            <Avatar sx={{ bgcolor: blueGrey[200], width: 56, height: 56 }}>A</Avatar>
        </div>
      

    )
}

export default ProfileAdmin;