import { useEffect, useState } from "react"
import styles from "./styles.module.css";

import { CreditCard, ArrowRightLeft } from "lucide-react";
import Grid from '@mui/material/Grid2';

import { useTransaction } from "../../hooks/useTransaction";
import { useAcconts } from "../../hooks/useAcconts";
import DialogTransfer from "../Wallets/DialogTransfer"
import DialogAddAccount from "./DialogAddAccount";


export function Wallets(){

    const {transactions} = useTransaction();
    const { account, refetchAccount } = useAcconts();

    const Saldo = account
     .reduce((acc, a) => acc + Number(a.amount), 0);

    return(
        <main className={styles.container}>
            <p className={styles.name_page}>Wallet</p>
            <p className={styles.description_page}>Manage your accounts and balance</p>
                <div className={styles.content}>
                    <div className={styles.gridLeft}>
                        <p className={styles.gridLefText}>Total Balance</p>
                        <p className={styles.gridLeftValue}>€ {Saldo}</p>
                    </div>
                    <div className={styles.gridright}>
                        <p>Quick Actions</p>
                        <DialogAddAccount refetchAccount={refetchAccount}/>
                        <DialogTransfer />
                    </div>
                </div>
                <div>
                    <div className={styles.ATM_cards}>
                        {account.map((a, index) => (
                            <div key={index} className={styles.individualCard}>
                                <div className={styles.individualCard_elemntos}>
                                    <p>{a.name}</p>
                                    <p className={styles.elementoType}>{a.type}</p>
                                </div>
                                    <p className={styles.elementoAmount}>{a.amount}€</p>
                            </div>
                        ))}
                    </div>
                </div>
                    {/* last transaction */}
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
        </main>
    )
}