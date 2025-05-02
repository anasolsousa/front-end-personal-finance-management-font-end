import { useState } from "react";
import { Alert, Button, MenuItem } from '@mui/material';
import allSyles from "../allStyles.module.css";
import { Pencil } from "lucide-react";
import { Category } from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import { useEntities } from "../../hooks/useEntities";
import * as React from "react";

// passar as props pelo botao no index - HomePage
interface EditSubEntityProps {
  id: string | number;
  name: string;
  entity_id: string;
  entity_name:string;
  token: string | null;
  refetch: () => void;
  isCloseModalEdit: () => void;
  isOpenModalEdit: boolean;
  openEditModal: (id: string | number, name: string, categoryID: string) => void;
}

export function EditSubEntities({
  id,
  name,
  entity_id, 
  entity_name,
  token, 
  refetch, 
  isCloseModalEdit, 
  isOpenModalEdit,
  openEditModal
}: EditSubEntityProps){

    const [subEntityName, setSubEntityName] = useState(name);
    const[entityID, setEntityID] = useState(entity_id);
   
    // material ui
    const [selectedEntity, setSelectedEntity] = useState<string>(entity_name)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // adicionar a lista de categorias
    const { entity } = useEntities();

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

      if(subEntityName === name && entityID === entity_id) {
        setAlertMessage('Nenhuma alteração feita.');
        setAlertType('warning');
        return;
      }

      if(!subEntityName || !entityID){
        setAlertMessage("Oops! Don't forget to fill in all the fields.");
        setAlertType('warning');
        return;
      }

      setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8000/api/auth/subEntity/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subEntityName,
          entity_id: entityID
        })
      });

      if (response.ok) {
        setAlertMessage('SubCategory updated successfully!');
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
                  id="SubcategoryName"
                  name="SubcategoryName"
                  value={subEntityName}
                  onChange={(e) => setSubEntityName(e.target.value)}
                />
              </label>
              <label>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      color: 'white',
                      backgroundColor: '#1e2738'
                    }}
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
                      <MenuItem 
                        key={entidade.id}
                        onClick={() => {
                          setSelectedEntity(entidade.name);
                          setEntityID(entidade.id);
                          handleClose();
                        }}
                      >
                        {entidade.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
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