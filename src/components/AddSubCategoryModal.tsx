import { FormEvent, useState } from "react";
import styles from "../pages/HomePageAdmin/styles.module.css";
import { Alert } from '@mui/material';

interface AddSubCategoryModalProps {
    token: string | null;
    refetch: () => void; // funcao para recarregar os dados apois o sucesso
    closeModal: () => void;
    isOpen: boolean;
  }

export function AddSubCategoryModal({
    token,
    refetch,
    closeModal,
    isOpen,
}: AddSubCategoryModalProps) {

        const[name, setName] = useState("");
        const[categoryID, setCategoryID] = useState("");

        const [alertMessage, setAlertMessage] = useState('');
        const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('success');


        async function handleAddSubCategory(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();

            if(!name || !categoryID) {
                setAlertMessage('Preencha os campos todos');
                setAlertType('error');

                setTimeout(() => {
                refetch(); 
                setName(""); 
                setCategoryID("");
                setAlertMessage(''); // Limpa a mensagem depois
                }, 1000);
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/api/auth/subcategories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: name,
                        category_id: categoryID
                    }),
            });

            const data = await response.json();

            if(response.ok) {
                setAlertMessage('Sub-categoria inserida com sucesso!');
                setAlertType('success');

                setTimeout(() => {
                    refetch(); 
                    closeModal(); 
                    setName(""); 
                    setCategoryID("");
                    setAlertMessage(''); // Limpa a mensagem depois
                }, 2000);
                } else {
                setAlertMessage('Por favor, preencha o campo corretamente.');
                setAlertType('error');
                }
            } catch (e) {
                console.log(e);
                setAlertMessage('Erro ao conectar com o servidor');
                setAlertType('error');
            }
            }

            if (!isOpen) return null;

            return(
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <form onSubmit={handleAddSubCategory}>
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
                                value={categoryID}
                                placeholder="CategoryID"
                                onChange={(e) => setCategoryID(e.target.value)}
                                />
                            </label>
                            <div className={styles.modalButtons}>
                                <button type="submit" className={styles.modalButtonPrimary}>Guardar</button>
                                <button type="button" onClick={closeModal} className={styles.modalButtonSecondary}>Cancelar</button>
                            </div>
                        </form>

                    {alertMessage && (
                        <Alert severity={alertType}
                            variant="outlined"
                            className={styles.successAlert}
                        >
                        {alertMessage}
                        </Alert>
                    )}
                </div>
            </div>
            );
    }