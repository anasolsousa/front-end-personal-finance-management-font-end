import { useEffect, useState } from "react"
import styles from "./styles.module.css"
// import Wallets from "../Wallets/index"


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

export function Transactions(){

    const [transactions, setTransactions] = useState<Transaction[]>([]);
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
                setTransactions(data);
                console.log(transactions);
            } else{
                console.error("error")
            }
        } catch (error){
            console.error(error)
        }
    }
    const lastTransaction = transactions[0];
    
    return(
        <>
        <h1>Transactions</h1>
            <div className={styles.sectionContent}>
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr className={styles.trHeader}>
                                <th>Account</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Notes</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Subcategory</th>
                                <th>Entity</th>
                                <th>Subentity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr className={styles.trBody} key={transaction.id}>
                                    <td>{transaction.account_id}</td>
                                    <td>{new Intl.NumberFormat('pt-PT', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(transaction.amount)}€</td>
                                    <td>{new Date(transaction.date).toLocaleDateString("pt-PT")}</td>
                                    <td>{transaction.notes}</td>
                                    <td>{transaction.payment_method}</td>
                                    <td className={transaction.type === 'income' ? styles.income : styles.expense}>{transaction.amount}</td>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.category.name}</td>
                                    <td>{transaction.sub_category.name}</td>
                                    <td>{transaction.entity.name}</td>
                                    <td>{transaction.sub_entity.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Transactions;