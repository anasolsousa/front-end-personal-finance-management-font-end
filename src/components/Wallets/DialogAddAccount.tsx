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
import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import styles from "./styles.module.css";
import { useAcconts } from '../../hooks/useAcconts';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type DialogAddAccountProps = {
  refetchAccount: () => void;
  // ...outras props se existirem
};

function DialogAddAccount({ refetchAccount }: DialogAddAccountProps) {
  
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const token = localStorage.getItem("token");


   console.log("Dados que vou enviar:", {
        name:name,
        amount: amount,
        type: type,
    });

  async function fetchAccount() {
    try {
        const response = await fetch("http://localhost:8000/api/auth/account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                amount: amount,
                type: type,
            }),
          });

          const data = await response.json();
          console.log(response);

          if (response.ok) {
              alert("sucesso");
              refetchAccount();
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
        <CreditCard size={16}/> 
        <p>Create new Card</p>
    </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2}} id="customized-dialog-title">
          Create new Card
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
                  {/* <button type="button" onClick={handleAddTransaction}>Submeter</button> */}
                  <div className={styles.formNewCard}>
                      <input
                          type='text'
                          onChange={(e) => setName(e.target.value)} 
                          required
                          className={styles.formInput}
                          placeholder="Name Card"
                      />
                      <input
                          type='text'
                          onChange={(e) => setType(e.target.value)} 
                          required
                          className={styles.formInput}
                          placeholder="Type"
                      />
                      <input
                          type='number'
                          step=".01"
                          onChange={(e) => setAmount(e.target.value)} 
                          required
                          className={styles.InputAmount}
                          placeholder="Amount"
                          style={{width: 250}}
                      />
                  </div>
          </div>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              fetchAccount();
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

export default DialogAddAccount;