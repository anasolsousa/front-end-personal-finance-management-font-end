import { useState } from "react";
import { Alert } from '@mui/material';
import allSyles from "../allStyles.module.css";
import { Pencil } from "lucide-react";

// passar as props pelo botao no index - HomePage
interface EditEntityProps {
  id: string | number;
  name: string;
  icon: string;
  token: string | null;
  refetch: () => void;
  isCloseModalEdit: () => void;
  isOpenModalEdit: boolean;
  openEditModal: (id: string | number, name: string, icon: string) => void;
}

export function EditEntity({
  id,
  name, 
  icon, 
  token, 
  refetch, 
  isCloseModalEdit, 
  isOpenModalEdit,
  openEditModal
}: EditEntityProps){

    const [entityName, setEntityName] = useState(name);
    const [entityIcon, setEntityIcon] = useState(icon);

    const [isUpdating, setIsUpdating] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success');

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (!token) {
        setAlertMessage('Token não encontrado. Faça login novamente.');
        setAlertType('error');
        return;
      }

      if(entityName === name && entityIcon === icon) {
        setAlertMessage('Nenhuma alteração feita.');
        setAlertType('warning');
        return;
      }

      if(!entityName || !entityIcon){
        setAlertMessage("Oops! Don't forget to fill in all the fields.");
        setAlertType('warning');
        return;
      }

      setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8000/api/auth/entities/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: entityName,
          icon: entityIcon
        })
      });

      if (response.ok) {
        setAlertMessage('Entity updated successfully!');
        setAlertType('success');
        
        setTimeout(() => {
          refetch(); 
          isCloseModalEdit(); 
          setAlertMessage(''); // Limpa a mensagem depois
        }, 2000);

      } else {
        const errorData = await response.json().catch(() => null);
        setAlertMessage(errorData?.message || "Oops! Error updating");
        setAlertType('error');
      }
    } catch (error) {
      console.error('Erro:', error);
      setAlertMessage('Error updating');
      setAlertType('error');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpenModalEdit) return null;

  return(
    <div>
      {isOpenModalEdit && (
        <div className={allSyles.modalOverlay}>
          <div className={allSyles.modal}>
            <form onSubmit={handleUpdate}>
              <label>
                <input
                  type="text"
                  id="entityName"
                  name="entityName"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  value={entityIcon}
                  onChange={(e) => setEntityIcon(e.target.value)}
                />
              </label>
              <div className={allSyles.modalButtons}>
                <button type="submit" disabled={isUpdating} className={allSyles.modalButtonPrimary}>
                  {isUpdating ? 'Updating...' : 'Update'}
                </button>
                <button type="button" onClick={isCloseModalEdit} className={allSyles.modalButtonSecondary}>
                  Cancelar
                </button>
              </div>
            </form>
            {alertMessage && (
              <Alert severity={alertType} variant="outlined" className={allSyles.successAlert}>
                {alertMessage}
              </Alert>
            )}
          </div>
        </div>
      )}
    </div>
  )
}