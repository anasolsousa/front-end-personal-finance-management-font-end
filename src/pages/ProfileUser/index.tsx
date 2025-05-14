import { useEffect, useState } from "react";
import style from "./styles.module.css";

import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

type User = {
  id:string,
  name: string,
  email: string
}

export function ProfileUser(){

  const [user, setUser] = useState<User | null>(null);
  const userId = localStorage.getItem("userId");  // Obter o userId do localStorage
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null); // imgame avatar
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {

    const savedImage = localStorage.getItem(`savedImage_${userId}`); // guarda a img no user atual 
      if(savedImage) {
        setSelectedImage(savedImage);
      }

    if(!token || !userId) {
      navigate("/user")
      return;
    }
   
      fetchProfile();
  },[token, userId, navigate]);

  async function fetchProfile() {
      try{
        const response = await fetch("http://localhost:8000/api/auth/userProfiles", {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        if(response.ok){
          const data = await response.json();
          const loggedInUser = data.find((u: User) => u.id === userId);
          if (loggedInUser) {
            setUser(loggedInUser);
          }
        }
        else{
          console.error("Erro")
        }
      } catch (error) {
        console.error(error)
      }
    }

  const nome = user?.name;
  const avatarName = nome?.split(" ")[0];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setSelectedImage(imageDataUrl);
        
        // Salva a imagem no localStorage como Data URL
        localStorage.setItem(`savedImage_${userId}`, imageDataUrl);
        localStorage.setItem('UserName', avatarName);
      };
      
      // Lê o arquivo como Data URL (Base64)
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    setTimeout(() => {
        navigate("/user");
    }, 100);
    return null;
  }

  return(
      <div>
         {isLoggedIn && (
          <>
            <header>
              <button className={style.buttonBack}
                    onClick={() => {
                    navigate("/userPanel");
                    }}
                    >Back
              </button>
            </header>
            
            <div className={style.profile}>
              <div>
                {selectedImage ? (
                    <Avatar sx={{ bgcolor: blueGrey[200], width: 100, height: 100 }} src={selectedImage}/>
                ) : (
                  <Avatar sx={{ bgcolor: blueGrey[200], width: 100, height: 100 }}>{avatarName}</Avatar>
                )}
                
              </div>
              <div>
                  {user && (
                      <div className={style.data}>
                          <div className={style.name}>
                              <p className={style.a}>Name</p>
                              <p className={style.b}>{user.name}</p>
                          </div>
                          <div className={style.email}>
                              <p className={style.a}>Email</p>
                              <p className={style.b}>{user.email}</p>
                          </div>
                          <div className={style.email}>
                            <p className={style.a}>Change photo</p>
                            <p className={style.b}><input type="file" accept="image/" onChange={handleImageChange}/> </p>
                          </div>
                      </div>
                  )}
              </div>
            </div>
          </>
         )}
      </div>
  )
}

export default ProfileUser;

export function getAvatarName(nome: string) {
  return nome.split(" ")[0];
}
