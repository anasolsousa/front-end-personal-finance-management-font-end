import {useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { FormEvent, useState } from 'react';

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                 "Content-Type": "application/json"
               },
               body: JSON.stringify({
                email:email,
                password:password
               }),
            });

            const data = await response.json();

            if(response.ok){

                localStorage.setItem("token", data.token);

                navigate("/homeAdmin");
                console.log(data.token);
                console.log("O meu token", data.token)
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
                                <input
                                    type='email'
                                    value={email}
                                    autoComplete="email"
                                    placeholder="your@email.com"
                                    onChange={(event) => setEmail(event.target.value)} 
                                    required
                                />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input  
                                type='password'
                                value={password}
                                autoComplete="current-password"
                                placeholder="******"  
                                onChange={(event) => setPassword(event.target.value)} 
                                required
                            />
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

export default AdminLogin;