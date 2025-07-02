import { use, useState } from "react";
import { useAcconts } from "../../hooks/useAcconts";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import style  from "./styles.module.css";
import { useEntities } from "../../hooks/useEntities";
import { useSubEntities } from "../../hooks/useSubEntities";

export function AddTransaction(){

    
    const token = localStorage.getItem("token");

    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [type, setType] = useState("");
    const [entityId, setEntityId] = useState("");
    const [subEntityId, setsubEntityId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");

    // transaction 
    const [accountId, setAccountId] = useState(""); // conta MB

    // transfer
    const [accountFrom, setAccountFrom] = useState("");
    const [accountTo, setAccountTo] = useState("");

    const {account} = useAcconts(); // para ver os nomes das contas MB (a lista)
    const { category } = useCategories(); // lista categorias
    const { subCategory } = useSubCategories();
    const { entity } = useEntities();
    const { subEntity } = useSubEntities();


    const [operactionType, setOperactionType ] = useState(""); // variavel para guardar a opcao do user
    const [selectedCategory, setSelectedCategory] = useState<string>('Select Category')
    
    console.log("Dados que vou enviar:", {
        operactionType,
        date: date,
        notes: notes,
        amount: amount,
        account_id: accountId,
        type: type,
        payment_method: paymentMethod,
        entity_id: entityId,
        sub_entity_id: subEntityId,
        category_id: categoryId,
        sub_category_id: subCategoryId,
    });

    // transaction 
    const handleAddTransaction = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    date: date,
                    notes: notes,
                    amount: amount,
                    account_id: accountId,
                    type: type,
                    payment_method: paymentMethod,
                    entity_id: entityId,
                    sub_entity_id: subEntityId,
                    category_id: categoryId,
                    sub_category_id: subCategoryId,
                }),
            });

            console.log(response);

            const data = await response.json();

            if (response.ok) {
                alert("sucesso");
            } else {
                alert(data.message || "Error.");
            }
        } catch (error) {
            alert("An error occurred.");
        }
    };

    const handleAddTransfer = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/transfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    date: date,
                    notes: notes,
                    amount: amount,
                    type: type,
                    account_from_id: accountFrom,
                    account_to_id: accountTo,
                    entity_id: entityId,
                    sub_entity_id: subEntityId,
                    category_id: categoryId,
                    sub_category_id: subCategoryId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("sucesso");
            } else {
                alert(data.message || "Error.");
            }
        } catch (error) {
            alert("An error occurred.");
        }
    };

    const handleOperactionType = () => {

        if(operactionType === "Transfer"){
            handleAddTransfer();
        }
        else if (operactionType === "Transaction"){
            handleAddTransaction();
        }
    }

    return(
        <main>
            <form>
                {/* selecionar o tipo de operacao */}
                <div>
                    <div className={style.typeOperaction}>
                        <select 
                            value={operactionType}
                            onChange={(e) => setOperactionType(e.target.value)}
                            className={style.formHeader}
                        >
                            <option value="" disabled selected>Select type</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Transaction">Transaction</option>
                        </select>
                    </div>
                    <div>
                        {operactionType === "Transaction"  && (
                            <div>
                                <div className={style.drop}>
                                    <select className={style.formInput} value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="" disabled selected>Type</option>
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>

                                    <select className={style.drop} value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                                        <option value="" disabled selected>Account</option>
                                            {account.map((a) => (
                                                <option key={a.id} value={a.id}>
                                                    {a.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                {/* <button type="button" onClick={handleAddTransaction}>Submeter</button> */}
                                <div className={style.formInfoImportant}>
                                    <input
                                        type='date'
                                        onChange={(e) => setDate(e.target.value)} 
                                        required
                                        className={style.dateInput}
                                    />
                                    
                                    <input
                                        type='number'
                                        step=".01"
                                        onChange={(e) => setAmount(e.target.value)} 
                                        required
                                        className={style.InputAmount}
                                        placeholder="Amount"
                                    />
                                </div>
                                
                                <input
                                    type='text'
                                    onChange={(e) => setPaymentMethod(e.target.value)} 
                                    required
                                    className={style.formInput}
                                    placeholder="Payment Method"
                                />
                                    
                                <div className={style.drop}>  
                                    <select className={style.formSelect} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                        <option value="">Select category</option>
                                        {category.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    
                                    <select className={style.formSelect} value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                                        <option value="">Select Subcategory</option>
                                        {subCategory.map((subCat) => (
                                            <option key={subCat.id} value={subCat.id}>
                                                {subCat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={style.drop}> 

                                    <select className={style.formSelect} value={entityId} onChange={(e) => setEntityId(e.target.value)}>
                                        <option value="">Select Entity</option>
                                        {entity.map((entity) => (
                                            <option key={entity.id} value={entity.id}>
                                                {entity.name}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    <select className={style.formSelect} value={subEntityId} onChange={(e) => setsubEntityId(e.target.value)}>
                                        <option value="">Select Subentity</option>
                                        {subEntity.map((sub) => (
                                            <option key={sub.id} value={sub.id}>
                                                {sub.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                    
                                <input
                                    type='text'
                                    onChange={(e) => setNotes(e.target.value)} 
                                    required
                                    className={style.formInput}
                                    placeholder="Notes"
                                />

                                <button type="button" className={style.formButton} onClick={handleAddTransaction}>
                                    Submeter
                                </button>
                            </div>
                        )}
                    </div>

                </div>
                
                
                {operactionType === "Transfer" && (
                    <div>
                        <button onClick={handleAddTransfer} className={style.formButton}>
                            Submeter
                        </button>
                    </div>
                )}

                
            </form>
        </main>
    );
}