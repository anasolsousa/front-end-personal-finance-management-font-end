import { useEffect, useState } from "react"
import styles from "./styles.module.css";

import { CirclePlus } from "lucide-react";
import Grid from '@mui/material/Grid2';

export function Wallets(){

    type Card = {
        name: string,
        type: string,
        amount: number,
        user_id: string
    }

    const [cards, setCards] = useState<Card[]>([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchCards();
    }, []);

    async function fetchCards() {
        try{
            const response = await fetch("http://localhost:8000/api/auth/account", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if(response.ok){
                const data = await response.json();
                const filterByUser = data.filter((u:Card) => u.user_id == userId);
                setCards(filterByUser);
            }
            else{
                console.error("error")
            }
        } catch (error){
            console.error(error)
        }
    }

    return(
        <>
        <h1>My Wallet</h1>
            <div className={styles.grid}>
                <div className={styles.section}>
                    {/* spacing={1} => controla espacamento entre as colunas */}
                    <Grid className={styles.containerGrid} container spacing={2}> 
                        <div className={styles.card}>
                            <p> Add Card +</p>
                        </div>
                        {cards.map((card, index) => (
                            // Cada item ocupa 12/4 = 3 colunas em ecrãs grandes, 6 em médios e 12 em pequenos -> item xs={12} sm={6} md={4} lg={3}
                            <div key={index}>
                                <div className={styles.card}>
                                    <div className={styles.gridColum1}>
                                        <p className={styles.gridName}>{card.name}</p>
                                        <p className={styles.gridType}>{card.type}</p>
                                        <p className={styles.gridAmount}>{card.amount}€</p>
                                    </div>
                                    <div className={styles.gridColum2}>
                                        <p><CirclePlus/></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Grid>
                </div>
                <div className={styles.sectionContent}>
                    <h1>Last Transaction</h1>
                    <div className={styles.tableContainer}>
                        <table>
                            <thead>
                                <tr className={styles.trHeader}>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}