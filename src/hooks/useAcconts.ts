import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

type account ={
    id: string,
    name: string,
    type: string,
    amount: number,
    user_id: string,
}

export function useAcconts(){

    const [account, setAccount] = useState<account[]>([]);
    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/");
        } else fetchAccount();
    }, [])

    async function fetchAccount() {
        try{
            const response = await fetch("http://localhost:8000/api/auth/account", {
                headers: {
                   "Authorization": `Bearer ${token}`,
                   "Accept": "application/json" // Adiciona cabeçalho para aceitar JSON
               }
            });

            if(response.ok) {
                const data = await response.json();
                setAccount(data);
            }
            else {
                const errorText = await response.text();
                console.error("Erro na requisição:", response.status, errorText);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return {
        account
    }
}

