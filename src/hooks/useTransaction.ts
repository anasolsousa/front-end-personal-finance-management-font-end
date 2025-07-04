import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export type Transaction = {
    id: string,
    date: Date,
    notes: string | null,
    amount: number,
    type: "income" | "expense",
    payment_method: string | null, 
    account_id: string;

    entity: {
        id: string;
        name: string;
        icon: string;
    },

    sub_entity: {
        id: string,
        name: string
    },
    
    sub_category: {
        id: string;
        name: string;
    },

    category: {
        id: string,
        name: string,
        icon: string
    }
}

export function useTransaction(){

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isLoggedIn){
            navigate("/user");
        } else fetchTransactions()
    },[]);

    async function fetchTransactions() {
        try{
            const response = await fetch("http://localhost:8000/api/auth/transaction", {
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            if(response.ok){
                const data = await response.json();
                setTransactions(data);
            } else{
                console.error("error")
            }
        } catch (error){
            console.error(error)
        }
    }

    return{
        transactions,
        refetchTransactions: fetchTransactions
    }
}
