import {useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { FormEvent, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export function SignUpUser() {

    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const[password, setPasswoord] = useState("");
    const [process, setProcess] = useState(false);

    async function handleLogiUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!email || !password){
            alert("Please enter a valid email address and password")
            return;
        }

        setProcess(true);

        // ir buscar os dados
        try {
            const response = await fetch("http://localhost:8000/api/auth/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id:id,
                    name: name,
                    email:email,
                    password: password
                }),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem("token", data.token)
                localStorage.setItem("userId", data.user.id); // passar o id 
                navigate("/user");
            }else {
                alert(data.message || "Error logging in. Check your credentials.");
            }}
            catch(e) {
                console.log(e);
            } finally {
                setProcess(false);
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
                        <p>Create Account</p>
                    </div>

                    <form className={styles.loginForm} onSubmit={handleLogiUser}>
                        <div className={styles.formGroup}>
                            <label htmlFor="text">Name</label>
                                <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} required/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                                <input type="email" placeholder="your@email.com" onChange={(event) => setEmail(event.target.value)} required/>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password"  placeholder="******" onChange={(event) => setPasswoord(event.target.value)} required/>
                        </div>

                        <button type="submit" className={styles.loginButton}>
                            Create
                        </button>
                    </form>
                        {process ? <LinearProgress color="inherit" sx={{marginTop: 5}}/>: '' }
                </div>
            </div> 
        </main>
        
    )
}

export default SignUpUser