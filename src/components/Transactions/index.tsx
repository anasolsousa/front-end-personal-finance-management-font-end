import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import {ArrowRightLeft} from "lucide-react";
import { useTransaction } from "../../hooks/useTransaction";
import { useAcconts } from "../../hooks/useAcconts";
import { AddTransaction } from "../AddTransaction";
import { useTransfer } from "../../hooks/useTransfer";

export function Transactions(){

    const {transactions, refetchTransactions} = useTransaction();
    const {transfer} = useTransfer();
    const {account} = useAcconts();
    const token = localStorage.getItem("token");

    

    // const lastTransaction = transactions[0];
    
    return(
       <main className={styles.container}>
        <p className={styles.name_page}>Transaction</p>
        <p className={styles.description_page}>Manage your financial transactions</p>
        <div className={styles.cards}>
          <div className={styles.card_table}>
              <p>Histórico de Transações</p>
                <div className={styles.tableCard}>
                  <div className={styles.tableScroll}>
                    <table className={styles.table}>
                      <thead className={styles.thead}>
                        <tr>
                          <th>Account</th>
                          <th className={styles.right}>Amount</th>
                          <th>Payment Method</th>
                          <th>Type</th>
                          <th>Subcategory</th>
                          <th className={styles.space}>Subentity</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody className={styles.tbody}>
                        {transactions.map((transaction, index) => (
                          <tr
                            key={transaction.id}
                            className={`${styles.row} ${index % 2 === 0 ? styles.even : styles.odd}`}
                          >
                            {/* const accountName = account.find(account => account.id === transactions.account_id); */}
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

                            <td className={styles.tooltipWrapper}>
                                <span className={styles.paymentMethod}>{transaction.payment_method} ⋮</span>
                                <div className={styles.tooltipContent}>
                                    <p><strong>Notas: </strong> {transaction.notes}</p>
                                </div>
                            </td>
                            <td>
                              <span className={`${styles.typeBadge} ${
                                transaction.type === 'income' ? styles.incomeBadge : styles.expenseBadge
                              }`}>
                                {transaction.type}
                              </span>
                            </td>

                            <td className={styles.tooltipWrapper}>
                                <span className={styles.tooltipTrigger}> {transaction.sub_category.name}</span>
                                <div className={styles.tooltipContent}>
                                    <p><strong>Categoria: </strong> {transaction.category.name}</p>
                                </div>
                            </td>

                            <td className={styles.tooltipWrapper}>
                                <span className={styles.tooltipTrigger}>{transaction.sub_entity.name}</span>
                                <div className={styles.tooltipContent}>
                                    <p><strong>Categoria: </strong>{transaction.entity.name}</p>
                                </div>
                            </td>
                            <td>{new Date(transaction.date).toLocaleDateString("pt-PT")}</td>

                          </tr>
                        ))}
                      </tbody>
                  </table>
                </div>
            </div>
          </div>
          <div className={styles.card_form}>
            <p className={styles.title_form}>Add New Transaction</p>      
              <AddTransaction refetchTransactions={refetchTransactions}/>
          </div>
        </div>
          {/* Podes adicionar aqui o formulário se quiseres, mantive só a tabela como pediste */}
        </main>
  );
};

export default Transactions;