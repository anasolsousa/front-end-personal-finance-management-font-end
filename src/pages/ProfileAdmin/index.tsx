import { useEffect, useState } from "react";
import style from "./styles.module.css";

import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

type admin = {
  id:string,
  name: string,
  email: string
}
export function ProfileAdmin(){

    const [admin, setAdmin] = useState<admin[]>([]);

    // const isLoggedIn = !!localStorage.getItem("token"); // verificar se esta logado
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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
          <header>
            <button className={style.buttonBack}
                  onClick={() => {
                  navigate("/homeAdmin");
                  }}
                  >Back
            </button>
          </header>
          <div className={style.profile}>
            <div>
              <Avatar sx={{ bgcolor: blueGrey[200], width: 100, height: 100 }}>A</Avatar>
            </div>
            <div>
              {admin.map((admin) => (
                <div key={admin.id} className={style.data}>
                  <div className={style.name}>
                    <p className={style.a}>Name</p>
                    <p  className={style.b}>{admin.name}</p>
                  </div>
                  <div className={style.email}>
                    <p className={style.a}>Email</p>
                    <p className={style.b}>{admin.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      

    )
}

export default ProfileAdmin;