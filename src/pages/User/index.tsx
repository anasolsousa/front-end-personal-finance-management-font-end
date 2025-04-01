import {useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { FormEvent, useState } from 'react';

export function User() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const[password, setPasswoord] = useState("");

    async function handleLogiUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!email || !password){
            alert("Please enter a valid email address and password")
            return;
        }
        // ir buscar os dados
        try {
            const response = await fetch("http://localhost:8000/api/auth/user/login", {
                method: "POST",
                headers: {
                    "Content-TYpe": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password: password
                }),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem("token", data.token)
                navigate("#");
                console.log("token")
            }else {
                alert(data.message || "Error logging in. Check your credentials.");
            }}
            catch(e) {
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
                        <h1>Finoro</h1>
                        <p>Sign in to your user account</p>
                    </div>

                    <form className={styles.loginForm} onSubmit={handleLogiUser}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                                <input type="email" placeholder="your@email.com" onChange={(event) => setEmail(event.target.value)} required/>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password"  placeholder="******" onChange={(event) => setPasswoord(event.target.value)} required/>
                        </div>

                        <button type="submit" className={styles.loginButton}>
                            Sign in
                        </button>

                        <div className={styles.socialDivider}>
                            <span>or</span>
                        </div>

                        <div className={styles.signupLink}>
                            Don't have an account? <a href="#">Sign up</a>
                        </div>
                    </form>
                </div>
            </div> 
        </main>
        
    )
}

export default User