import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import {ArrowRightLeft } from "lucide-react";
import styles from "./styles.module.css";

import { useAcconts } from "../../hooks/useAcconts";
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEntities } from "../../hooks/useEntities";
import { useSubEntities } from "../../hooks/useSubEntities";
import { useTransfer } from "../../hooks/useTransfer";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function DialogTransfer() {
  
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [entityId, setEntityId] = useState("");
  const [subEntityId, setsubEntityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  // transfer
  const [accountFrom, setAccountFrom] = useState("");
  const [accountTo, setAccountTo] = useState("");

  const {account} = useAcconts();
  const { category } = useCategories(); // lista categorias
  const { subCategory } = useSubCategories();
  const { entity } = useEntities();
  const { subEntity } = useSubEntities();

  const { refetchTransfer } = useTransfer();


  const token = localStorage.getItem("token");

   console.log("Dados que vou enviar:", {
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
    });


  async function fetchTransfer() {
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
          console.log(response);

          if (response.ok) {
              alert("sucesso");
              refetchTransfer();
          } else {
              alert(data.message || "Error.");
          }
        } catch (error) {
            alert("An error occurred.");
        }          
  }
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <button className={styles.gridrightButton} onClick={handleClickOpen}>
        <ArrowRightLeft size={16}/> 
        <p>Create new Transfer</p>
    </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2}} id="customized-dialog-title">
          Create Transfer
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom sx={{p:3}}>
             <div>
              <select className={styles.formInputType} value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="" disabled>Type</option>
                  <option value="account_transfer">Account transfers</option>
                  <option value="saving">Saving</option>
                  <option value="investment">Investment</option>
              </select>
              <div className={styles.drop}>
                  <select className={styles.drop} value={accountFrom} onChange={(e) => setAccountFrom(e.target.value)}>
                      <option value="" disabled>Account From</option>
                          {account.map((a) => (
                              <option key={a.id} value={a.id}>
                                  {a.name}
                              </option>
                          ))}
                  </select>
                  <select className={styles.drop} value={accountTo} onChange={(e) => setAccountTo(e.target.value)}>
                      <option value="" disabled>Account To</option>
                          {account.map((a) => (
                              <option key={a.id} value={a.id}>
                                  {a.name}
                              </option>
                          ))}
                  </select>
              </div>
                  {/* <button type="button" onClick={handleAddTransaction}>Submeter</button> */}
                  <div className={styles.formInfoImportant}>
                      <input
                          type='date'
                          onChange={(e) => setDate(e.target.value)} 
                          required
                          className={styles.dateInput}
                      />
                      
                      <input
                          type='number'
                          step=".01"
                          onChange={(e) => setAmount(e.target.value)} 
                          required
                          className={styles.InputAmount}
                          placeholder="Amount"
                      />
                  </div>
                      
                  <div className={styles.drop}>  
                      <select className={styles.formSelect} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                          <option value="">Select category</option>
                          {category.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                  {cat.name}
                              </option>
                          ))}
                      </select>
                      
                      
                      <select className={styles.formSelect} value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                          <option value="">Select Subcategory</option>
                          {subCategory.map((subCat) => (
                              <option key={subCat.id} value={subCat.id}>
                                  {subCat.name}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className={styles.drop}> 

                      <select className={styles.formSelect} value={entityId} onChange={(e) => setEntityId(e.target.value)}>
                          <option value="">Select Entity</option>
                          {entity.map((entity) => (
                              <option key={entity.id} value={entity.id}>
                                  {entity.name}
                              </option>
                          ))}
                      </select>
                      
                      <select className={styles.formSelect} value={subEntityId} onChange={(e) => setsubEntityId(e.target.value)}>
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
                      className={styles.formInput}
                      placeholder="Notes"
                  />
          </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              fetchTransfer();
            }}
            sx={{
              color: "#fbbf24"
            }}
          >
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default DialogTransfer;