import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import {ArrowRightLeft} from "lucide-react";
import { useTransaction } from "../../hooks/useTransaction";
import { useAcconts } from "../../hooks/useAcconts";
import { AddTransaction } from "../AddTransaction";

export function Transactions(){

    const {transactions} = useTransaction();
    const {account} = useAcconts();
    const token = localStorage.getItem("token");

    

    // const lastTransaction = transactions[0];
    
    return(
       <main className={styles.container}>
        <p className={styles.name_page}>Transaction</p>
        <div className={styles.cards}>
          <div className={styles.card_table}>
              <div className={styles.tableCard}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th>Conta</th>
                        <th className={styles.right}>Montante</th>
                        <th>Método Pagamento</th>
                        <th>Tipo</th>
                        <th>Sub Categoria</th>
                        <th className={styles.space}>Sub Entidade</th>
                        <th>Data</th>
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
            <p>form new transaction </p>

            <AddTransaction/>
            {/* <form className={styles.form_new_transaction}>
                <div className={styles.formGroup}>
                  <label>Transaction</label>
                   <select id="opcoes" name="opcoes">
                    <option value="">Selecione a transaction</option>
                     <option value="">-- Seleciona --</option>
                        <option>Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                  </select>
                    <label htmlFor="date">date
                      <input
                        type='date'
                        // onChange={(event) => setEmail(event.target.value)} 
                        required
                      />
                    </label>

                    <label htmlFor="text">notes
                      <input
                        type='text'
                        // onChange={(event) => setEmail(event.target.value)} 
                        required
                      />
                    </label>

                    <label htmlFor="text">amount
                      <input
                        type='number'
                        step=".01"
                        // onChange={(event) => setEmail(event.target.value)} 
                        required
                      />
                    </label>
                    <label htmlFor="text">account_from
                      <input
                        type='number'
                        step=".01"
                        // onChange={(event) => setEmail(event.target.value)} 
                        required
                      />
                    </label>
                       
                      
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input  
                        type='password'
                        // value={password}
                        autoComplete="current-password"
                        placeholder="******"  
                        // onChange={(event) => setPassword(event.target.value)} 
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>
                    Sign in
                </button>
            </form> */}
          </div>
        </div>
          {/* Podes adicionar aqui o formulário se quiseres, mantive só a tabela como pediste */}
        </main>
  );
};

export default Transactions;