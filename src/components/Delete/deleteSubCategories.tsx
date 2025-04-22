// components/Delete/deleteCategories.tsx
import { useState } from "react";
import { Trash2 } from "lucide-react"; // Importa o ícone de lixeira
import { Alert } from '@mui/material';
import allSyles from "../allStyles.module.css";


interface DeleteSubCategoriesProps {
  id: string | number;
  token: string | null;
  refetch: () => void;
}

export function DeleteSubCategories({ id, token, refetch }: DeleteSubCategoriesProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success');

  const handleDeleteSubCategory = async () => {
    if (!token) {
      setAlertMessage('Token não encontrado. Faça login novamente.');
      setAlertType('error');
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:8000/api/auth/subcategories/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        setAlertMessage('SubCategory successfully removed!');
        setAlertType('success');
        
        // Atualiza os dados após exclusão
        refetch();
        
        // Limpa a mensagem após 3 segundos
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => null);
        setAlertMessage(errorData?.message || "Oops! Error deleting");
        setAlertType('error');
      }
    } catch (error) {
      console.error('Erro:', error);
      setAlertMessage('Error deleting');
      setAlertType('error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteSubCategory}
        disabled={isDeleting}
        className={allSyles.trashButton}
      >
        {isDeleting ? (
          // Ícone de carregamento quando estiver apagando
          <span></span> 
        ) : (
          <Trash2 className={allSyles.trashButton2} />
        )}
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
  );
}