import { FormEvent, useState } from "react";
import { Alert } from '@mui/material';
import allSyles from "../allStyles.module.css";

interface AddEntityModalProps {
  token: string | null;
  refetch: () => void; // funcao para recarregar os dados apois o sucesso
  closeModal: () => void;
  isOpen: boolean;
}

export function AddEntityModal({ 
  token, 
  refetch, 
  closeModal, 
  isOpen,
}: AddEntityModalProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success');

  async function handleAddCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !icon) {
      setAlertMessage("Oops! Don't forget to fill in all the fields.");
      setAlertType('warning');

      setTimeout(() => {
        refetch(); 
        setName(""); 
        setIcon("");
        setAlertMessage(''); // Limpa a mensagem depois
      }, 2000);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/entities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          icon: icon
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Chamar o callback de sucesso
        setAlertMessage('Enity created successfully!');
        setAlertType('success');

        setTimeout(() => {
          refetch(); 
          closeModal(); 
          setName(""); 
          setIcon("");
          setAlertMessage(''); // Limpa a mensagem depois
        }, 2000);
      } else {
        setAlertMessage("Oops! Don't forget to fill in all the fields.");
        setAlertType('error');
      }
    } catch (e) {
      console.log(e);
      setAlertMessage('Server’s not responding. Please try again');
      setAlertType('error');
    }
  }

  if (!isOpen) return null;

  return (
    <div className={allSyles.modalOverlay}>
      <div className={allSyles.modal}>
        <form onSubmit={handleAddCategory}>
          <label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              value={icon}
              placeholder="Icon"
              onChange={(e) => setIcon(e.target.value)}
            />
          </label>
          <div className={allSyles.modalButtons}>
            <button type="submit" className={allSyles.modalButtonPrimary}>Guardar</button>
            <button type="button" onClick={closeModal} className={allSyles.modalButtonSecondary}>Cancelar</button>
          </div>
        </form>
        <button className={allSyles.iconButtons}>
          <a target="_blank" href="https://lucide.dev/icons/">Icons</a>
        </button>
      
        {alertMessage && (
            <Alert severity={alertType}
                variant="outlined"
                className={allSyles.successAlert}
                sx={{
                    filter: 'brightness(1.4) saturate(1.5)',  
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)'
                }}
            >
            {alertMessage}
            </Alert>
        )}
      </div>
    </div>
  );
}