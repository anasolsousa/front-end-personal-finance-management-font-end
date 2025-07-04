import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


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
    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransfer();
    },[]);

     useEffect(() => {
        if (!isLoggedIn) {
            navigate("/user");
        } else {
            fetchTransfer();
        }
    }, []);

    async function fetchTransfer() {
        try{
            const response = await fetch("http://localhost:8000/api/auth/transfer", {
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
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
        transfer,
        refetchTransfer: fetchTransfer
    }
}
