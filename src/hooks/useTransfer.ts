import { useEffect, useState } from "react"

export type Transfer = {
    id: string,
    date: Date,
    notes: string | null,
    amount: number,
    type: "saving" | "account_transfer" | "investment",
    account_from_id: string,
    account_to_id: string;

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

export function useTransfer(){

    const [transfer, setTransfer] = useState<Transfer[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTransactions();
    },[]);

    async function fetchTransactions() {
        try{
            const response = await fetch("http://localhost:8000/api/auth/transfer", {
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            });

            if(response.ok){
                const data = await response.json();
                setTransfer(data);
            } else{
                console.error("error")
            }
        } catch (error){
            console.error(error)
        }
    }

    return{
        transfer
    }
}
