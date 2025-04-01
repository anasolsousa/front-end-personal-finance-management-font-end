import {useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { FormEvent, useState } from 'react';

function Admin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPasswoord] = useState("");
    
    async function handleLoginAdmin(event:FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if(!email || !password){
            alert("Please enter a valid email address and password")
            return;
        }

        try{
            const response = await fetch("http://127.0.0.1:8000/api/auth/admin/login",{
               method: "POST",
               headers: {
                 "Content-TYpe": "application/json"
               },
               body: JSON.stringify({
                email:email,
                password:password
               }),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem("token", data.token)
                navigate("/homeAdmin");
                console.log("token")
                console.log("DEU")
            } else{
                alert(data.message || "Error logging in. Check your credentials.");
            }}
            catch(e){
                console.log(e);
            }
        }

    return(
        
        <main>

        <button className={styles.buttonBack}
            onClick={() => {
            navigate("/");
            }}
            >Back
        </button>
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <div className={styles.loginHeader}>
                        <h1>Admin</h1>
                    </div>

                    <form className={styles.loginForm} onSubmit={handleLoginAdmin}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                                <input placeholder="your@email.com" type='email' onChange={(event) => setEmail(event.target.value)} required/>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input  placeholder="******" type='password' onChange={(event) => setPasswoord(event.target.value)} required/>
                        </div>
                        <button type="submit" className={styles.loginButton}>
                            Sign in
                        </button>
                    </form>
                </div>
            </div> 
        </main>
        
    )
}

export default Admin