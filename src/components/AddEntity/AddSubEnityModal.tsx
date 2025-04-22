import { FormEvent, useState } from "react";
import { Alert } from '@mui/material';
import { useEntities } from "../../hooks/useEntities";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as LucideIcons from 'lucide-react';
import allSyles from "../allStyles.module.css";

// Função capturar o componente do ícone
const getIconComponent = (iconName: string) => {
    try {
        const formattedIconName = iconName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');

        const Icon = LucideIcons[formattedIconName as keyof typeof LucideIcons];

        if (Icon) {
            return <Icon />;
        } else {
            console.warn(`Ícone '${iconName}' não encontrado no pacote Lucide.`);
            return null;
        }
    } catch (error) {
        console.error("Erro ao tentar acessar o ícone:", error);
        return null;
    }
};

interface AddSubEntityModalProps {
    token: string | null;
    refetch: () => void; // funcao para recarregar os dados apois o sucesso
    closeModal: () => void;
    isOpen: boolean;
}

export function AddSubEntityModal({
    token,
    refetch,
    closeModal,
    isOpen,
}: AddSubEntityModalProps) {

        const[name, setName] = useState("");
        const[entityID, setEntityID] = useState("");

        const [alertMessage, setAlertMessage] = useState('');
        const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success');

        // adicionar a lista de categorias
         const {entity} = useEntities();

        const [selectedEntity, setSelectedEntity] = useState<string>('Select Category')
        // dropdown 
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        async function handleAddSubCategory(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();

            if(!name || !entityID) {
                setAlertMessage("Oops! Don't forget to fill in all the fields.");
                setAlertType('warning');

                setTimeout(() => {
                refetch(); 
                setName(""); 
                setEntityID("");
                setAlertMessage(''); // Limpa a mensagem depois
                }, 2000);
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/api/auth/subEntity", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: name,
                        entity_id: entityID
                    }),
            });

            const data = await response.json();

            if(response.ok) {
                setAlertMessage('Subentity created successfully!');
                setAlertType('success');

                setTimeout(() => {
                    refetch(); 
                    closeModal(); 
                    setName(""); 
                    setEntityID("");
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

            return(
                <div className={allSyles.modalOverlay}>
                    <div className={allSyles.modal}>
                        <form onSubmit={handleAddSubCategory}>
                            <label>
                                <input
                                type="text"
                                value={name}
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <div>
                                <Button
                                    id="basic-button"
                                    className={allSyles.basic_button}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    >
                                    {selectedEntity}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {entity.map((entidade) => (
                                        <MenuItem onClick={handleClose}>
                                            <div className={allSyles.row} key={entidade.id} onClick={() => {
                                                setSelectedEntity(entidade.name)
                                                setEntityID(entidade.id)}}>  {/* // Passa como argumento o id da categoria atual (categoria.id) */}
                                                <option>{entidade.name}</option>
                                            </div>
                                        </MenuItem>
                                            
                                    ))}
                                </Menu>
                            </div>
                            <div className={allSyles.modalButtons}>
                                <button type="submit" className={allSyles.modalButtonPrimary}>Guardar</button>
                                <button type="button" onClick={closeModal} className={allSyles.modalButtonSecondary}>Cancelar</button>
                            </div>
                        </form>

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