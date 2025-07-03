import { useEffect, useState } from "react"
import styles from "./styles.module.css";

import { CirclePlus } from "lucide-react";
import Grid from '@mui/material/Grid2';

import { useTransaction } from "../../hooks/useTransaction";
import { useAcconts } from "../../hooks/useAcconts";


export function Wallets(){

    const {transactions} = useTransaction();
    const {account} = useAcconts();

    return(
        <main className={styles.container}>
            <p className={styles.name_page}>Wallet</p>
                <div className={styles.content}>
                    <div className={styles.gridLeft}>
                        <h1>My Wallet</h1>
                            <div className={styles.cards}>
                                <p className={styles.cardsTitle}> Add Card +</p>
                                    {account.map((a, index) => (
                                        <div key={index}>
                                            <div className={styles.card}>
                                                <div>
                                                    <p className={styles.cardName}>{a.name}</p>
                                                    <p className={styles.cardType}>{a.type}</p>
                                                    <p className={styles.cardAmount}>{a.amount}€</p>
                                                </div>
                                                <div className={styles.gridColum2}>
                                                    <p><CirclePlus/></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                    </div>
                    <div className={styles.gridright}>
                        <h1>Last Transaction</h1>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead className={styles.thead}>
                                        <tr>
                                            <th>Account</th>
                                            <th className={styles.right}>Amount</th>
                                            <th>Type</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className={styles.tbody}>
                                        {transactions.map((transaction, index) => (
                                            <tr
                                                key={transaction.id}
                                                className={`${styles.row} ${index % 2 === 0 ? styles.even : styles.odd}`}
                                            >
                                                <td>{account.find(a => a.id === transaction.account_id)?.name}</td>
                                                <td
                                                    className={`${styles.right} ${
                                                        transaction.type === 'income' ? styles.income : styles.expense
                                                    }`}
                                                    >
                                                    {transaction.type === 'income' ? '+' : '-'}
                                                    {new Intl.NumberFormat('pt-PT', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }).format(transaction.amount)}€
                                                </td>
                                                <td>
                                                    <span className={`${styles.typeBadge} ${
                                                        transaction.type === 'income' ? styles.incomeBadge : styles.expenseBadge
                                                    }`}>
                                                        {transaction.type}
                                                    </span>
                                                </td>

                                                <td className={styles.tooltipWrapper}>
                                                    <span className={styles.tooltipTrigger}> {transaction.category.name}</span>
                                                </td>
                                                <td>{new Date(transaction.date).toLocaleDateString("pt-PT")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
        </main>
    )
}