import { useEffect, useState } from "react"

type transaction = {
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

export function Transactions(){

    const [transactions, settransactions] = useState<transaction[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTransactions();
    },[]);

    async function fetchTransactions() {
        try{
            const response = await fetch("http://localhost:8000/api/auth/transaction", {
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            });

            if(response.ok){
                const data = await response.json();
                settransactions(data);
                console.log(data);
            } else{
                console.error("error")
            }
        } catch (error){
            console.error(error)
        }
    }

    return(
        <>
            <h1>Transactions</h1>
            {transactions.map((transaction) => (
                <div key={transaction.id}>
                    <p>Conta: {transaction.account_id}</p>
                    <p>Valor: {transaction.amount}</p>
                    <p>Date: {transaction.date.toString()}</p>
                    <p>Notas: {transaction.notes}</p>
                    <p>Metodo de pagamento: {transaction.payment_method}</p>
                    <p>Tipo: {transaction.type}</p>

                    <p>Categoria: {transaction.category.name}</p>
                    <p>SubCategoria: {transaction.sub_category.name}</p>
                    
                    <p>Entidade: {transaction.entity.name}</p>
                    <p>SubEntidade: {transaction.sub_entity.name}</p>
                </div>
            ))}
        </>
    )
}

export default Transactions;